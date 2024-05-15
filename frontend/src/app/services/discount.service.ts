import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { WorkedHoursResponse } from '../interfaces/worked-hours.interface';

@Injectable({
    providedIn: 'root',
})
export class DiscountService {
    constructor(private http: HttpClient) {}

    getCurrentWorkerOwedDiscount$(): Observable<number> {
        return this.http
            .get<OwedDiscountResponse>('api/workers/current-user-owed-discount')
            .pipe(map((res) => res.owedDiscount));
    }

    getCurrentWorkerUsedDiscount$(): Observable<number> {
        return this.http
            .get<UsedDiscountResponse>('api/workers/current-user-used-discount')
            .pipe(map((res) => res.usedDiscount));
    }

    getCurrentWorkerWorkedHours$(): Observable<number> {
        return this.http
            .get<WorkedHoursResponse>('api/workers/current-user-worked-hours')
            .pipe(map((res) => res.workedHoursAmount));
    }

    getUsedDiscountByWorkerCode$(workerCode: string): Observable<number> {
        return this.http
            .get<UsedDiscountResponse>(`api/workers/used-discount/${workerCode}`)
            .pipe(map((res) => res.usedDiscount));
    }

    getOwedDiscountByWorkerCode$(workerCode: string): Observable<number> {
        return this.http
            .get<OwedDiscountResponse>(`api/workers/owed-discount/${workerCode}`)
            .pipe(map((res) => res.owedDiscount));
    }
}
