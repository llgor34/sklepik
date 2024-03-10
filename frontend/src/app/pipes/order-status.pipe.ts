import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../interfaces/order.interface';

@Pipe({
    name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
    transform(orderStatus: OrderStatus): string {
        switch (orderStatus) {
            case 'new':
                return 'Nowe';

            case 'done':
                return 'Gotowe do wydania';

            case 'closed':
                return 'Zamknięte';

            case 'nd':
                return 'Nie dotyczy';
        }
    }
}
