import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Filter } from 'src/app/interfaces/filter.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    orders$!: Observable<Order[]>;

    activeFilter: string = '';
    filters: Filter[] = [
        { label: 'Wszystko', value: '' },
        { label: 'Hotdogi', value: 'hotdog' },
        { label: 'Bułki', value: 'bułka' },
    ];

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.orders$ = this.orderService.getOrders$().pipe(tap(console.log));
    }
}
