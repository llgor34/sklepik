import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NumeratedProduct } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';
import { ToastService } from 'src/app/services/toast.service';
import { Observable, Subscription, forkJoin, of, switchMap } from 'rxjs';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
    selector: 'app-sell-products',
    templateUrl: './sell-products.component.html',
    styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements OnInit, OnDestroy {
    products: NumeratedProduct[] = [];
    paymentMethod: PaymentMethod | null = null;
    lessonId: number | null = null;

    subscription = new Subscription();

    constructor(
        private productsService: ProductsService,
        private orderService: OrderService,
        private discountService: DiscountService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.subscription.add(this.listenForReadyOrders());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    listenForReadyOrders(): Subscription {
        return this.orderService.orderReady$().subscribe((orderNumber) => this.showOrderReadyNotification(orderNumber));
    }

    submitSell(): void {
        if (this.noPaymentMethod()) {
            this.showNoPaymentMethodSelectedNotification();
            return;
        }

        if (this.notAllProductOptionsAreSelected()) {
            this.showRequiredOptionsNotification();
            return;
        }

        this.orderService.createOrder$(this.products, this.paymentMethod!, this.lessonId).subscribe((orderNumber) => {
            this.resetProducts();
            this.showOrderCreationSuccessNotification(orderNumber);
        });
    }

    showOrderReadyNotification(orderNumber: number): void {
        this.toastService.showSuccess(`Zamówienie o numerze: ${orderNumber}, jest gotowe do wydania`);
    }

    showOrderCreationSuccessNotification(orderNumber: number): void {
        this.toastService.showSuccess(`Utworzono zamówienie o numerze: ${orderNumber}`);
    }

    showRequiredOptionsNotification(): void {
        this.toastService.showWarning('Należy wybrać opcje dla produktów');
    }

    showNoPaymentMethodSelectedNotification(): void {
        this.toastService.showWarning('Należy wybrać metodę płatności');
    }

    fetchProduct(productCode: number): void {
        this.productsService
            .getProductByCode$(productCode)
            .pipe(switchMap((product) => this.mapToProductWithDiscounts(product!)))
            .subscribe((data) => {
                const [product, usedDiscount, owedDiscount] = data;
                if (!product) {
                    return;
                }
                if (this.isProductDiscount(product)) {
                    product.maxDiscountAmount = this.calculateMaxDiscountAmount(owedDiscount!, usedDiscount!);
                }

                this.addProduct(product);
            });
    }

    mapToProductWithDiscounts(product: NumeratedProduct): Observable<[NumeratedProduct, number | null, number | null]> {
        if (this.isProductDiscount(product)) {
            return forkJoin([
                of(product),
                this.discountService.getOwedDiscountByWorkerCode$(product.code!),
                this.discountService.getOwedDiscountByWorkerCode$(product.code!),
            ]);
        }
        return of([product, null, null]);
    }

    calculateMaxDiscountAmount(owedDiscount: number, usedDiscount: number): number {
        return (owedDiscount + usedDiscount) * 2;
    }

    addProduct(product: NumeratedProduct): void {
        this.products.push(product);
    }

    removeProduct(idx: number): void {
        this.products.splice(idx, 1);
    }

    resetProducts(): void {
        this.products = [];
    }

    isProductDiscount(product: NumeratedProduct): boolean {
        return this.productsService.isProductDisabled(product);
    }

    noPaymentMethod(): boolean {
        return !this.paymentMethod;
    }

    notAllProductOptionsAreSelected(): boolean {
        let valid = true;
        mainLoop: for (const product of this.products) {
            for (const option of product.selectedOptions) {
                if (option.option_id === null) {
                    valid = false;
                    break mainLoop;
                }
            }
        }
        return !valid;
    }
}
