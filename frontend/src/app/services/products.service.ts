import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NumeratedProduct, Product, ProductResponse, ProductsResponse } from '../interfaces/product.interface';
import { Response } from '../interfaces/response.interface';
import { ProductType } from '../interfaces/product-type.interface';
import { ProductRecord } from '../interfaces/product-record.interface';
import { IdResponse } from '../interfaces/id-response.interface';

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
        return product.product_category_options.length > 0;
    }

    getProductByCode$(code: number): Observable<NumeratedProduct | null> {
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
                      } as NumeratedProduct)
                    : res.product
            )
        );
    }

    getProducts$(): Observable<Product[]> {
        return this.http.get<ProductsResponse>('api/product').pipe(map((res) => res.products));
    }

    updateProduct$ = (id: number, productData: Partial<Product>): Observable<Response> => {
        const productDataPrepared = {
            ...productData,
            company: undefined,
            company_id: productData.company?.id,
        };

        return this.http.put<Response>(`api/product/${id}`, productDataPrepared);
    };

    deleteProduct$ = (id: number): Observable<Response> => {
        return this.http.delete<Response>(`api/product/${id}`);
    };

    createProduct$ = (productRecord: ProductRecord): Observable<number> => {
        return this.http.post<IdResponse>('api/product', productRecord).pipe(map((res) => res.id));
    };
}
