import { Component, HostBinding, Input, inject } from '@angular/core';
import { HOTDOG_CONFIG } from 'src/app/constants/hotdog-config.constant';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent {
    private readonly HOTDOG_CONFIG = inject(HOTDOG_CONFIG);

    @Input() order!: Order;

    @Input()
    @HostBinding('class')
    classes = 'col-12 col-md-6 col-lg-4 mb-4';

    @Input() showTitle = true;
    @Input() showProducts = true;
    @Input() showStatus = true;

    isHotdog(productCode: string): boolean {
        return this.HOTDOG_CONFIG.hotdog_code === productCode;
    }

    isDoubleDog(productCode: string): boolean {
        return this.HOTDOG_CONFIG.doubledog_code === productCode;
    }

    isZegDog(productCode: string): boolean {
        return this.HOTDOG_CONFIG.zegdog_code === productCode;
    }
}
