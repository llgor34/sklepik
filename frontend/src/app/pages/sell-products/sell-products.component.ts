import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentMethod } from 'src/app/interfaces/payment-method.interface';

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
    public authService: AuthService,
    private productsService: ProductsService,
    private orderService: OrderService
  ) {}

  ngDoCheck(): void {
    this.calculateProductsSum();
  }

  submitSell() {
    if (!this.paymentMethod) return;

    this.orderService.createOrder(this.products, this.paymentMethod).subscribe({
      next: () => {
        this.resetProductCodeControl();
        this.resetProducts();
        this.sum = 0;
        this.amountPayed = 0;
        this.exchange = 0;

        this.focusProductCodeControl();
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

  onProductCodePaste(event: ClipboardEvent) {
    const productCode = +event.clipboardData!.getData('text');
    if (!productCode) return;

    this.getProduct(productCode);
  }

  onGetProduct() {
    if (!this.productCode) return;

    this.getProduct(this.productCode);
  }

  getProduct(productCode: number) {
    this.productsService.getProductByCode(productCode).subscribe((product) => {
      this.focusProductCodeControl();
      if (!product) return;

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
