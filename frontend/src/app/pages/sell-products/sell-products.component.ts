import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';
import { ToastService } from 'src/app/services/toast.service';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
    selector: 'app-sell-products',
    templateUrl: './sell-products.component.html',
    styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements DoCheck {
    products: Product[] = [];
    productCode: number | null = null;
    paymentMethod: PaymentMethod | null = null;
    productIdsWithDisabledAmount: number[] = [30];

    lessons$ = this.lessonService.getLessons$();
    lessonId = null;

    sum = 0;
    amountPayed = 0;
    exchange = 0;

    @ViewChild('productCodeControl', { static: true })
    productCodeControl!: ElementRef;

    constructor(
        private productsService: ProductsService,
        private orderService: OrderService,
        private hoursSettlementService: HoursSettlementService,
        private lessonService: LessonService,
        private toastService: ToastService
    ) {}

    ngDoCheck(): void {
        this.calculateProductsSum();
    }

    submitSell() {
        if (!this.paymentMethod) return;
        if (!this.isProductOptionsSelected()) {
            this.toastService.showWarning('Należy wybrać opcje dla produktów');
            return;
        }

        this.orderService
            .createOrder$(this.products, this.paymentMethod, this.lessonId)
            .subscribe(({ orderNumber }) => {
                this.resetProductCodeControl();
                this.focusProductCodeControl();
                this.resetProducts();
                this.resetSums();

                this.toastService.showSuccess(`Utworzono zamówienie o numerze: ${orderNumber}`);
            });
    }

    calculateProductsSum() {
        let newProductsSum = 0;
        for (const product of this.products) {
            newProductsSum += product.price * product.amount;
        }

        if (this.sum === newProductsSum) return;
        this.sum = newProductsSum;
    }

    resetSums() {
        this.sum = 0;
        this.amountPayed = 0;
        this.exchange = 0;
    }

    resetProducts() {
        this.products = [];
    }

    resetProductCodeControl() {
        this.productCode = null;
    }

    onGetProduct() {
        if (!this.productCode) return;
        this.getProduct(this.productCode);
    }

    getProduct(productCode: number) {
        this.productsService
            .getProductByCode$(productCode)
            .pipe(
                switchMap((product) =>
                    this.isProductDiscount(product!)
                        ? forkJoin([
                              of(product),
                              this.hoursSettlementService.getUsedDiscount(product!.code),
                              this.hoursSettlementService.getOwedDiscount(product!.code),
                          ])
                        : of([product, null, null])
                )
            )
            .subscribe((data) => {
                const [product, usedDiscount, owedDiscount] = data;

                this.focusProductCodeControl();
                if (!product) return;

                if (this.isProductDiscount(product)) {
                    const discountLeft = <number>owedDiscount + <number>usedDiscount;
                    product.maxDiscountAmount = discountLeft * 2;
                }

                this.addProduct(product);
                this.resetProductCodeControl();
            });
    }

    focusProductCodeControl() {
        this.productCodeControl.nativeElement.focus();
    }

    isProductDiscount(product: Product) {
        return product.type === 'discount';
    }

    isProductIdAmountDisabled(id: number) {
        return this.productIdsWithDisabledAmount.some((productId) => productId === id);
    }

    isProductOptionsSelected() {
        let valid = true;
        mainLoop: for (const product of this.products) {
            for (const option of product.selectedOptions) {
                if (option.option_id === null) {
                    valid = false;
                    break mainLoop;
                }
            }
        }
        return valid;
    }

    isOrder() {
        return this.products.some((product) => this.hasProductOptions(product));
    }

    hasProductOptions(product: Product) {
        return product.product_category_options.length > 0;
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(idx: number) {
        this.products.splice(idx, 1);
    }
}
