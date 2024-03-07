import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellmentCloseDataResponse } from '../interfaces/sellment-close-product.interface';

@Injectable({
    providedIn: 'root',
})
export class SellmentCloseRaportService {
    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<SellmentCloseDataResponse>('api/raports/sellment-close/latest-raport-preview');
    }

    generateRaport() {
        return this.http.get('api/raports/sellment-close/generate-raport', {
            responseType: 'blob',
        });
    }
}
