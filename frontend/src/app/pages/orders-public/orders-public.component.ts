import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable, map } from 'rxjs';
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
    isOverflowOn = false;

    constructor(
        private orderService: OrderService,
        private filterService: OrdersFilterService,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.ordersInProgress$ = this.getOrdersInProgress$();
        this.ordersDone$ = this.getOrdersDone$();
        this.toggleOverflow();
    }

    ngOnDestroy(): void {
        this.toggleOverflow();
    }

    toggleOverflow() {
        if (!this.isOverflowOn) {
            this.isOverflowOn = true;
            this.renderer.setStyle(document.body, 'overflow', 'hidden');
            return;
        }
        this.renderer.removeStyle(document.body, 'overflow');
    }

    getOrdersInProgress$(): Observable<Order[]> {
        return this.orderService
            .getOrders$()
            .pipe(map((orders) => orders.filter((order) => this.filterService.filterByStatus(order, 'new'))));
    }

    getOrdersDone$(): Observable<Order[]> {
        return this.orderService
            .getOrders$()
            .pipe(map((orders) => orders.filter((order) => this.filterService.filterByStatus(order, 'done'))));
    }
}
