import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellmentCloseRaport } from '../interfaces/sellment-close-product.interface';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class SellmentCloseRaportService {
    constructor(private http: HttpClient) {}

    getProducts$(): Observable<SellmentCloseRaport> {
        return this.http
            .get<Response<SellmentCloseRaport>>('api/raports/sellment-close/latest-raport-preview')
            .pipe(map((res) => res.data));
    }

    generateRaport$(): Observable<Blob> {
        return this.http.get('api/raports/sellment-close/generate-raport', {
            responseType: 'blob',
        });
    }
}
