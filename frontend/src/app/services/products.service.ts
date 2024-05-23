import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NumeratedProduct, Product } from '../interfaces/product.interface';
import { Response } from '../interfaces/response.interface';
import { ProductType } from '../interfaces/product-type.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    getProductTypeList(): ProductType[] {
        return ['article', 'product', 'discount', 'promotion'];
    }

    getProductsIdWithDisabledAmount(): number[] {
        return [30];
    }

    productHasDisabledAmount(productId: number) {
        return this.getProductsIdWithDisabledAmount().includes(productId);
    }

    isProductDisabled(product: Product) {
        return product.type === 'discount';
    }

    isSellOrder(products: Product[]) {
        return products.some((product) => this.hasProductOptions(product));
    }

    hasProductOptions(product: Product) {
        return product.product_category_options!.length > 0;
    }

    getProductByCode$(code: number): Observable<NumeratedProduct | null> {
        return this.http.get<Response<NumeratedProduct | null>>(`api/product/${code}`).pipe(
            map((res) =>
                res.data
                    ? ({
                          ...res.data,
                          amount: 1,
                          selectedOptions: res.data.product_category_options!.map((category) => ({
                              category_id: category.category_id,
                              option_id: category.options[0].id,
                          })),
                      } as NumeratedProduct)
                    : null
            )
        );
    }

    getProducts$(): Observable<Product[]> {
        return this.http.get<Response<Product[]>>('api/product').pipe(map((res) => res.data));
    }

    updateProduct$ = (id: number, productData: Partial<Product>): Observable<Response> => {
        return this.http.put<Response>(`api/product/${id}`, productData);
    };

    deleteProduct$ = (id: number): Observable<Response> => {
        return this.http.delete<Response>(`api/product/${id}`);
    };

    createProduct$ = (fieldData: Product): Observable<number> => {
        return this.http.post<Response<number>>('api/product', fieldData).pipe(map((res) => res.data));
    };
}
