import { Component, HostBinding, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    @Input() order!: Order;

    @Input()
    @HostBinding('class')
    classes = 'col-12 col-md-6 col-lg-4 mb-4';

    @Input() showTitle = true;
    @Input() showProducts = true;
    @Input() showStatus = true;
}
