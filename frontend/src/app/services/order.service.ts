import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

import { NumeratedProduct } from '../interfaces/product.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';
import { OrderNumberResponse } from '../interfaces/order-number.interface';
import { Order, OrderStatus } from '../interfaces/order.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private socket: Socket | null = null;
    private listenersCount$ = new BehaviorSubject(0);

    constructor(private http: HttpClient) {
        this.listenersCount$.subscribe((count) => {
            if (count === 0) {
                this.closeConnection();
            }
        });
    }

    private createConnection() {
        if (this.socket) return;

        this.socket = io(`${environment.wsAddress}/orders`, environment.wsConfig);
        this.listenersCount$.next(this.listenersCount$.value + 1);
    }

    private closeConnection() {
        if (!this.socket) return;

        this.socket.close();
        this.socket = null;
    }

    private onObservableDestroy() {
        this.listenersCount$.next(this.listenersCount$.value - 1);
    }

    createOrder$(products: NumeratedProduct[], paymentMethod: PaymentMethod, lessonId: number | null) {
        return this.http.post<OrderNumberResponse>('api/order/create', {
            products,
            paymentMethod,
            lessonId,
        });
    }

    getOrders$(): Observable<Order[]> {
        const observable = new Observable<Order[]>((observer) => {
            this.createConnection();
            this.socket!.on('connect', () => {
                this.socket!.on('ordersChange', (orders: Order[]) => observer.next(orders));
                this.socket!.on('reconnect_error', () => observer.error('Unexpected problem with socket connection'));
            });

            return () => this.onObservableDestroy();
        });

        return observable;
    }

    orderReady$(): Observable<number> {
        const observable = new Observable<number>((observer) => {
            this.createConnection();
            this.socket!.on('connect', () => {
                this.socket!.on('orderReady', (orderNumber: number) => {
                    observer.next(orderNumber);
                });
                this.socket!.on('reconnect_error', () => observer.error('Unexpected problem with socket connection'));
            });

            return () => this.onObservableDestroy();
        });

        return observable;
    }

    updateOrderStatus$(orderId: number, orderStatus: OrderStatus): Observable<Response> {
        return this.http.put<Response>('api/order/update-status', { orderId, orderStatus });
    }
}
