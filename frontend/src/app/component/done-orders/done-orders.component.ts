import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order, OrderStatus } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';
import { OrdersFilterService } from 'src/app/services/orders-filter.service';

@Component({
    selector: 'app-done-orders',
    templateUrl: './done-orders.component.html',
    styleUrls: ['./done-orders.component.css'],
})
export class DoneOrdersComponent implements OnInit {
    orders$!: Observable<Order[]>;
    isOrdersShown = false;

    constructor(private orderService: OrderService, private filterService: OrdersFilterService) {}

    ngOnInit() {
        this.orders$ = this.orderService
            .getOrders$()
            .pipe(map((orders) => orders.filter((order) => this.filterService.filterByStatus(order, 'done'))));
    }

    toggleShowOrders() {
        this.isOrdersShown = !this.isOrdersShown;
    }

    updateOrderStatus(orderId: number, orderStatus: OrderStatus) {
        this.orderService.updateOrderStatus$(orderId, orderStatus).subscribe();
    }
}
