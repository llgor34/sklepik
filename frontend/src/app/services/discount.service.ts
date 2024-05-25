import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class DiscountService {
    constructor(private http: HttpClient) {}

    getCurrentWorkerOwedDiscount$(): Observable<number> {
        return this.http.get<Response<number>>('api/workers/current-user-owed-discount').pipe(map((res) => res.data));
    }

    getCurrentWorkerUsedDiscount$(): Observable<number> {
        return this.http.get<Response<number>>('api/workers/current-user-used-discount').pipe(map((res) => res.data));
    }

    getCurrentWorkerWorkedHours$(): Observable<number> {
        return this.http.get<Response<number>>('api/workers/current-user-worked-hours').pipe(map((res) => res.data));
    }

    getUsedDiscountByWorkerCode$(workerCode: string): Observable<number> {
        return this.http.get<Response<number>>(`api/workers/used-discount/${workerCode}`).pipe(map((res) => res.data));
    }

    getOwedDiscountByWorkerCode$(workerCode: string): Observable<number> {
        return this.http.get<Response<number>>(`api/workers/owed-discount/${workerCode}`).pipe(map((res) => res.data));
    }
}
