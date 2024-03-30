import { Injectable, inject } from '@angular/core';

import { Filter } from '../interfaces/filter.interface';
import { Order, OrderStatus } from '../interfaces/order.interface';
import { HOTDOG_CONFIG } from '../constants/hotdog-config.constant';
import { BUN_CONFIG } from '../constants/bun-config.constant';

@Injectable({
    providedIn: 'root',
})
export class OrdersFilterService {
    private readonly HOTDOG_CODES: string[] = inject(HOTDOG_CONFIG).all_codes;
    private readonly BUN_CODES: string[] = inject(BUN_CONFIG).all_codes;

    private filters: Filter[] = [
        {
            label: 'Nowe',
            filterFn: (order: Order) => this.filterByStatus(order, 'new'),
        },
        {
            label: 'Hotdogi',
            filterFn: (order: Order) =>
                this.filterByMultipleProductCode(order, this.HOTDOG_CODES) && !this.filterByStatus(order, 'done'),
        },
        {
            label: 'Bułki',
            filterFn: (order: Order) =>
                this.filterByMultipleProductCode(order, this.BUN_CODES) && !this.filterByStatus(order, 'done'),
        },
        {
            label: 'Wykonane',
            filterFn: (order: Order) => this.filterByStatus(order, 'done'),
        },
    ];

    filterByStatus(order: Order, status: OrderStatus) {
        return order.order_status === status;
    }

    filterByMultipleProductCode(order: Order, codes: string[]) {
        for (const code of codes) {
            if (this.filterByProductCode(order, code)) {
                return true;
            }
        }
        return false;
    }

    filterByProductCode(order: Order, code: string) {
        return order.products.some((product) => product.code === code);
    }

    getFilters(): Filter[] {
        return this.filters;
    }
}
