import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/products.service';
import { SellService } from 'src/app/sell.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements DoCheck {
  products: Product[] = [];
  productCode: number | null = null;

  sum = 0;
  amountPayed = 0;
  exchange = 0;

  @ViewChild('productCodeControl', { static: true })
  productCodeControl!: ElementRef;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private sellService: SellService
  ) {}

  ngDoCheck(): void {
    this.calculateProductsSum();
  }

  insertSell() {
    this.sellService.insertSell(this.products).subscribe(console.log);
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
        this.productCodeControl.nativeElement.focus();
        if (!product) return;

        const existingProduct = this.products.filter(
          (productInArray) => productInArray.kod == product.kod
        )[0];

        if (existingProduct) {
          this.products[this.products.indexOf(existingProduct)].ilosc++;
          this.productCode = null;
          return;
        }

        this.products.push(product);
        this.productCode = null;
      });
  }

  removeProduct(idx: number) {
    this.products.splice(idx, 1);
  }

  get userFullname() {
    return `${this.authService.user!.name} ${this.authService.user!.surname}`;
  }

  get roles() {
    return this.authService.user!.role;
  }
}
