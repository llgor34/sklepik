import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';
import { ToastService } from 'src/app/services/toast.service';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { ErrorResponse } from 'src/app/interfaces/errorResponse.interface';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements DoCheck {
  products: Product[] = [];
  productCode: number | null = null;
  paymentMethod: PaymentMethod | null = null;

  sum = 0;
  amountPayed = 0;
  exchange = 0;

  @ViewChild('productCodeControl', { static: true })
  productCodeControl!: ElementRef;

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService,
    private toastService: ToastService,
    private hoursSettlementService: HoursSettlementService
  ) {}

  ngDoCheck(): void {
    this.calculateProductsSum();
  }

  submitSell() {
    if (!this.paymentMethod) return;

    this.orderService.createOrder(this.products, this.paymentMethod).subscribe({
      next: () => {
        this.resetProductCodeControl();
        this.focusProductCodeControl();
        this.resetProducts();
        this.sum = 0;
        this.amountPayed = 0;
        this.exchange = 0;

        this.toastService.showSuccess('Utworzono zamówienie');
      },
      error: (err: ErrorResponse) => {
        let message = 'Wystąpił nieoczekiwany błąd';
        switch (err.message) {
          case 'DISCOUNT_TOO_HIGH':
            message =
              'Kwota zniżki nie może przekraczać łącznej kwoty wypracowanych zniżek';
            break;
          case 'NEGATIVE_PRICE':
            message = 'Kwota zamówienia nie może być ujemna';
            break;
        }
        this.toastService.showError(message);
      },
    });
  }

  calculateProductsSum() {
    let newProductsSum = 0;
    for (const product of this.products) {
      newProductsSum += product.price * product.amount;
    }
    this.sum = newProductsSum;
  }

  resetProducts() {
    this.products = [];
  }

  onGetProduct() {
    if (!this.productCode) return;

    this.getProduct(this.productCode);
  }

  getProduct(productCode: number) {
    this.productsService
      .getProductByCode(productCode)
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

        const existingProduct = this.getExistingProduct(product);
        if (existingProduct) {
          this.products[this.products.indexOf(existingProduct)].amount++;
          this.resetProductCodeControl();
          return;
        }

        this.addProduct(product);
        this.resetProductCodeControl();
      });
  }

  isProductDiscount(product: Product) {
    return product.type === 'discount';
  }

  focusProductCodeControl() {
    this.productCodeControl.nativeElement.focus();
  }

  resetProductCodeControl() {
    this.productCode = null;
  }

  getExistingProduct(product: Product) {
    return this.products.filter(
      (productInArray) => productInArray.code == product.code
    )[0];
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(idx: number) {
    this.products.splice(idx, 1);
  }
}
