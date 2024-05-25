import { Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NumeratedProduct } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';
import { ToastService } from 'src/app/services/toast.service';
import { Observable, Subscription, forkJoin, of, switchMap } from 'rxjs';
import { LessonService } from 'src/app/services/lesson.service';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
    selector: 'app-sell-products',
    templateUrl: './sell-products.component.html',
    styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements DoCheck, OnInit, OnDestroy {
    products: NumeratedProduct[] = [];
    productCode: number | null = null;
    paymentMethod: PaymentMethod | null = null;
    productIdsWithDisabledAmount: number[] = this.productsService.getProductsIdWithDisabledAmount();

    lessons$: Observable<Lesson[]> = this.lessonService.getLessons$();
    lessonId = null;

    currentOrderNumber$: Observable<number> = this.orderService.getCurrentOrderNumber$();

    sum = 0;
    amountPayed = 0;
    exchange = 0;

    @ViewChild('productCodeControl', { static: true })
    productCodeControl!: ElementRef;

    subscription = new Subscription();

    constructor(
        private productsService: ProductsService,
        private orderService: OrderService,
        private discountService: DiscountService,
        private lessonService: LessonService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.subscription.add(this.listenForReadyOrders());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngDoCheck(): void {
        this.calculateProductsSum();
    }

    listenForReadyOrders() {
        this.orderService.orderReady$().subscribe((orderNumber) => {
            this.toastService.showSuccess(`Zamówienie o numerze: ${orderNumber}, jest gotowe do wydania`);
        });
    }

    submitSell() {
        if (!this.paymentMethod) return;
        if (!this.isProductOptionsSelected()) {
            this.toastService.showWarning('Należy wybrać opcje dla produktów');
            return;
        }

        if (this.lessonId === 'null') {
            this.lessonId = null;
        }

        this.orderService.createOrder$(this.products, this.paymentMethod, this.lessonId).subscribe((orderNumber) => {
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
            newProductsSum += product.price! * product.amount;
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
                              this.discountService.getUsedDiscountByWorkerCode$(product!.code!),
                              this.discountService.getOwedDiscountByWorkerCode$(product!.code!),
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

    isProductDiscount(product: NumeratedProduct) {
        return this.productsService.isProductDisabled(product);
    }

    productHasAmountDisabled(productId: number) {
        return this.productsService.productHasDisabledAmount(productId);
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
        return this.productsService.isSellOrder(this.products);
    }

    hasProductOptions(product: NumeratedProduct) {
        return this.productsService.hasProductOptions(product);
    }

    addProduct(product: NumeratedProduct) {
        this.products.push(product);
    }

    removeProduct(idx: number) {
        this.products.splice(idx, 1);
    }
}
