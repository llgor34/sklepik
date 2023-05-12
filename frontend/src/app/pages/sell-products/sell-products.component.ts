import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/products.service';
import { SellService } from 'src/app/sell.service';

@Component({
  selector: 'app-sell-products',
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.css'],
})
export class SellProductsComponent implements DoCheck {
  products: Product[] = [];
  productCode: number | null = null;

  sum = 0;
  amountPayed = 0;
  exchange = 0;

  @ViewChild('productCodeControl', { static: true })
  productCodeControl!: ElementRef;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private sellService: SellService
  ) {}

  ngDoCheck(): void {
    this.calculateProductsSum();
  }

  submitSell() {
    this.sellService.insertSell(this.products).subscribe({
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
      newProductsSum += product.cena * product.ilosc;
    }

    this.sum = newProductsSum;
  }

  getProduct() {
    if (!this.productCode) return;

    this.productsService
      .getProductByCode(this.productCode)
      .subscribe((product) => {
        this.focusProductCodeControl();
        if (!product) return;

        const existingProduct = this.getExistingProduct(product);

        if (existingProduct) {
          this.products[this.products.indexOf(existingProduct)].ilosc++;
          this.resetProductCodeControl();
          return;
        }

        this.addProduct(product);
        this.resetProductCodeControl();
      });
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(idx: number) {
    this.products.splice(idx, 1);
  }

  getExistingProduct(product: Product) {
    return this.products.filter(
      (productInArray) => productInArray.kod == product.kod
    )[0];
  }

  focusProductCodeControl() {
    this.productCodeControl.nativeElement.focus();
  }

  resetProductCodeControl() {
    this.productCode = null;
  }

  resetProducts() {
    this.products = [];
  }
}
