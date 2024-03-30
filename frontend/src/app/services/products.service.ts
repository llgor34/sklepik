import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product, ProductResponse } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    getProductByCode$(code: number): Observable<Product | null> {
        return this.http.get<ProductResponse>(`api/product/${code}`).pipe(
            map((res) =>
                res.product
                    ? ({
                          ...res.product,
                          amount: 1,
                          selectedOptions: res.product.product_category_options.map((category) => ({
                              category_id: category.category_id,
                              option_id: category.options[0].id,
                          })),
                      } as Product)
                    : res.product
            )
        );
    }
}
