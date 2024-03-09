import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Filter } from 'src/app/interfaces/filter.interface';
import { Order, OrderStatus } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    orders$!: Observable<Order[]>;

    activeFilter: string = 'new';
    filters: Filter[] = [
        { label: 'Nowe', value: 'new' },
        { label: 'Hotdogi', value: 'hotdog' },
        { label: 'Bułki', value: 'bułka' },
        { label: 'Wykonane', value: 'done' },
    ];

    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.orders$ = this.orderService.getOrders$().pipe(tap(console.log));
    }

    updateOrderStatus(orderId: number, orderStatus: OrderStatus) {
        this.orderService.updateOrderStatus$(orderId, orderStatus).subscribe(console.log);
    }

    trackByOrderId(index: number, order: Order) {
        return order.order_id;
    }
}
