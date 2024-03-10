import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Filter } from 'src/app/interfaces/filter.interface';
import { Order, OrderStatus } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';
import { OrdersFilterService } from 'src/app/services/orders-filter.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    orders$!: Observable<Order[]>;
    filters!: Filter[];
    activeFilterIdx: number = 0;

    constructor(private orderService: OrderService, private filterService: OrdersFilterService) {}

    ngOnInit() {
        this.filters = this.filterService.getFilters();
        this.orders$ = this.orderService.getOrders$().pipe(tap(console.log));
    }

    updateOrderStatus(orderId: number, orderStatus: OrderStatus) {
        this.orderService.updateOrderStatus$(orderId, orderStatus).subscribe(console.log);
    }

    getCurrentFilterFn() {
        return this.filters[this.activeFilterIdx].filterFn;
    }

    trackByOrderId(index: number, order: Order) {
        return order.order_id;
    }
}
