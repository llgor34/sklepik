import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product, ProductResponse } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductByCode(code: number) {
    return this.http
      .get<ProductResponse>(`api/product/${code}`)
      .pipe(
        map((res) =>
          res.product ? ({ ...res.product, amount: 1 } as Product) : res.product
        )
      );
  }
}
