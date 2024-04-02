import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker, WorkersResponse } from '../interfaces/worker.interface';
import { Observable, map } from 'rxjs';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { WorkedHoursResponse } from '../interfaces/worked-hours.interface';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    constructor(private http: HttpClient) {}

    getWorkers$(): Observable<Worker[]> {
        return this.http.get<WorkersResponse>('api/workers/get').pipe(map((res) => res.workers));
    }

    getWorkerOwedDiscount$(): Observable<number> {
        return this.http
            .get<OwedDiscountResponse>('api/workers/get-owed-discount-by-id')
            .pipe(map((res) => res.owedDiscount));
    }

    getWorkerUsedDiscount$(): Observable<number> {
        return this.http
            .get<UsedDiscountResponse>('api/workers/get-used-discount-by-id')
            .pipe(map((res) => res.usedDiscount));
    }

    getWorkerWorkedHours$(): Observable<number> {
        return this.http
            .get<WorkedHoursResponse>('api/workers/get-worked-hours')
            .pipe(map((res) => res.workedHoursAmount));
    }
}
