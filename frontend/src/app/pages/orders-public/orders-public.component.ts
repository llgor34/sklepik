import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';
import { OrdersFilterService } from 'src/app/services/orders-filter.service';

@Component({
    selector: 'app-orders-public',
    templateUrl: './orders-public.component.html',
    styleUrls: ['./orders-public.component.css'],
})
export class OrdersPublicComponent implements OnInit {
    ordersInProgress$!: Observable<Order[]>;
    ordersDone$!: Observable<Order[]>;

    constructor(private orderService: OrderService, private filterService: OrdersFilterService) {}

    ngOnInit() {
        this.initOrders();
    }

    initOrders() {
        const orders$ = this.orderService.getOrders$();
        this.ordersInProgress$ = orders$.pipe(
            map((orders) => orders.filter((order) => this.filterService.filterByStatus(order, 'new')))
        );
        this.ordersDone$ = orders$.pipe(
            map((orders) => orders.filter((order) => this.filterService.filterByStatus(order, 'done')))
        );
    }
}
