import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';
import { NumeratedProduct } from 'src/app/interfaces/product.interface';
import { LessonService } from 'src/app/services/lesson.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent {
    @Output() removeProductAtIdx = new EventEmitter<number>();

    @Input() products: NumeratedProduct[] = [];
    @Input() paymentMethod: PaymentMethod | null = null;
    @Output() paymentMethodChange = new EventEmitter<PaymentMethod | null>();

    @Input() lessonId: number | null = null;
    @Output() lessonIdChange = new EventEmitter<number | null>();

    lessons$: Observable<Lesson[]> = this.lessonService.getLessons$();
    currentOrderNumber$: Observable<number> = this.orderService.getCurrentOrderNumber$();

    amountPayed = 0;
    exchange = 0;
    get productsSum(): number {
        if (this.products.length === 0) {
            return 0;
        }
        return this.products
            .map((product) => product.price! * product.amount)
            .reduce((sum, currentValue) => (sum += currentValue));
    }

    constructor(
        private productsService: ProductsService,
        private lessonService: LessonService,
        private orderService: OrderService
    ) {}

    onRemoveProductAtIdx(idx: number) {
        this.removeProductAtIdx.emit(idx);
    }

    hasProductAmountDisabled(productId: number) {
        return this.productsService.productHasDisabledAmount(productId);
    }

    hasProductOptions(product: NumeratedProduct) {
        return this.productsService.hasProductOptions(product);
    }

    isProductDiscount(product: NumeratedProduct) {
        return this.productsService.isProductDisabled(product);
    }

    isOrder() {
        return this.productsService.isSellOrder(this.products);
    }
}
