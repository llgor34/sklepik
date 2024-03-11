import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../environment/environment';

import { Product } from '../interfaces/product.interface';
import { PaymentMethod } from '../interfaces/payment-method.interface';
import { OrderNumberResponse } from '../interfaces/order-number.interface';
import { Order, OrderStatus } from '../interfaces/order.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient) {}

    createOrder(products: Product[], paymentMethod: PaymentMethod) {
        return this.http.post<OrderNumberResponse>('api/order/create', {
            products,
            paymentMethod,
        });
    }

    getOrders$(): Observable<Order[]> {
        const socket = io(`${environment.wsAddress}/orders`, environment.wsConfig);
        const observable = new Observable<Order[]>((observer) => {
            socket.on('connect', () => {
                socket.on('ordersChange', (orders: Order[]) => observer.next(orders));
                socket.on('reconnect_error', () => observer.error('Unexpected problem with socket connection'));
                socket.on('disconnect', () => observer.complete());
            });
            return () => socket.close();
        });

        return observable;
    }

    updateOrderStatus$(orderId: number, orderStatus: OrderStatus): Observable<Response> {
        return this.http.put<Response>('api/order/update-status', { orderId, orderStatus });
    }
}
