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

    getRaportPreviewLatest$(): Observable<SellmentCloseRaport> {
        return this.http
            .get<Response<SellmentCloseRaport>>('api/raports/sellment-close/raport-preview')
            .pipe(map((res) => res.data));
    }

    getRaportPreviewById$(id: number): Observable<SellmentCloseRaport> {
        return this.http
            .get<Response<SellmentCloseRaport>>(`api/raports/sellment-close/raport-preview/${id}`)
            .pipe(map((res) => res.data));
    }

    generateRaportLatest$(): Observable<Blob> {
        return this.http.get('api/raports/sellment-close/generate-raport', { responseType: 'blob' });
    }

    generateRaportById$(id: number): Observable<Blob> {
        return this.http.get(`api/raports/sellment-close/generate-raport/${id}`, { responseType: 'blob' });
    }
}
