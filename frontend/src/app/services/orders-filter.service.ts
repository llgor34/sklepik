import { Injectable } from '@angular/core';

import { Filter } from '../interfaces/filter.interface';
import { Order, OrderStatus } from '../interfaces/order.interface';

@Injectable({
    providedIn: 'root',
})
export class OrdersFilterService {
    private filters: Filter[] = [
        {
            label: 'Nowe',
            filterFn: (order: Order) => this.filterByStatus(order, 'new'),
        },
        {
            label: 'Hotdogi',
            filterFn: (order: Order) =>
                this.filterByProductName(order, 'hotdog') && !this.filterByStatus(order, 'done'),
        },
        {
            label: 'Bułki',
            filterFn: (order: Order) => this.filterByProductName(order, 'bułka') && !this.filterByStatus(order, 'done'),
        },
        {
            label: 'Wykonane',
            filterFn: (order: Order) => this.filterByStatus(order, 'done'),
        },
    ];

    filterByStatus(order: Order, status: OrderStatus) {
        return order.order_status === status;
    }

    filterByProductName(order: Order, value: string) {
        return order.products.some((product) => product.short_name.toLowerCase().includes(value));
    }

    getFilters(): Filter[] {
        return this.filters;
    }
}
