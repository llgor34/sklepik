import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';
import { OrdersFilterService } from 'src/app/services/orders-filter.service';

@Component({
    selector: 'app-orders-public',
    templateUrl: './orders-public.component.html',
    styleUrls: ['./orders-public.component.css'],
})
export class OrdersPublicComponent implements OnInit, OnDestroy {
    ordersInProgress$!: Observable<Order[]>;
    ordersDone$!: Observable<Order[]>;

    constructor(
        private appComponent: AppComponent,
        private orderService: OrderService,
        private filterService: OrdersFilterService
    ) {}

    ngOnInit() {
        this.appComponent.disableSidebar();
        this.initOrders();
    }

    ngOnDestroy() {
        this.appComponent.enableSidebar();
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
