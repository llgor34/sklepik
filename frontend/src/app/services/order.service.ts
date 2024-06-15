import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Socket } from 'socket.io-client';

import { NumeratedProduct } from '../interfaces/product.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';
import { Order, OrderStatus } from '../interfaces/order.interface';
import { Response } from '../interfaces/response.interface';
import { SocketService } from './socket.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient, private socketService: SocketService) {}

    createOrder$(
        products: NumeratedProduct[],
        paymentMethod: PaymentMethod,
        lessonId: number | null
    ): Observable<number> {
        return this.http
            .post<Response<number>>('api/order', {
                products,
                paymentMethod,
                lessonId,
            })
            .pipe(map((res) => res.data));
    }

    getOrders$(): Observable<Order[]> {
        const observable = new Observable<Order[]>((observer) => {
            const socket = this.createSocketConnection();
            socket.on('connect', () => {
                socket.on('ordersChange', (orders: Order[]) => observer.next(orders));
                socket.on('reconnect_error', () => observer.error('Unexpected problem with socket connection'));
            });
            return () => this.closeSocketConnection(socket);
        });

        return observable;
    }

    orderReady$(): Observable<number> {
        const observable = new Observable<number>((observer) => {
            const socket = this.createSocketConnection();
            socket.on('connect', () => {
                socket.on('orderReady', (orderNumber: number) => observer.next(orderNumber));
                socket.on('reconnect_error', () => observer.error('Unexpected problem with socket connection'));
            });
            return () => this.closeSocketConnection(socket);
        });

        return observable;
    }

    updateOrderStatus$(orderId: number, orderStatus: OrderStatus): Observable<Response> {
        return this.http.put<Response>('api/order/update-status', { orderId, orderStatus });
    }

    getCurrentOrderNumber$(): Observable<number> {
        return this.http.get<Response<number>>('api/order/current-order-number').pipe(map((res) => res.data));
    }

    private createSocketConnection(): Socket {
        return this.socketService.createConnection('/orders');
    }

    private closeSocketConnection(socket: Socket): void {
        this.socketService.closeConnection(socket);
    }
}
