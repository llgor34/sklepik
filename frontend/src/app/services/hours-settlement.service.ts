import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';
import { HoursSettlement, HoursSettlementResponse } from '../interfaces/hours-settlement.interface';
import { Response } from '../interfaces/response.interface';
import { DateService } from './date.service';
import { HoursSettlementForm } from '../interfaces/activity.interface';

@Injectable({
    providedIn: 'root',
})
export class HoursSettlementService {
    constructor(private http: HttpClient, private dateService: DateService) {}

    getUsedDiscount(workerCode: string): Observable<number> {
        return this.http
            .get<UsedDiscountResponse>(`api/workers/get-used-discount/${workerCode}`)
            .pipe(map((res) => res.usedDiscount));
    }

    getOwedDiscount(workerCode: string): Observable<number> {
        return this.http
            .get<OwedDiscountResponse>(`api/workers/get-owed-discount/${workerCode}`)
            .pipe(map((res) => res.owedDiscount));
    }

    getHoursSettlement(): Observable<HoursSettlement[]> {
        return this.http.get<HoursSettlementResponse>('api/hours-settlement').pipe(
            map((res) => res.hoursSettlement),
            map((hoursSettlement) =>
                hoursSettlement.map((hourSettlement) => ({
                    ...hourSettlement,
                    work_date: this.dateService.formateDate(hourSettlement.work_date, 'DD.MM.yyyy'),
                }))
            )
        );
    }

    deleteHoursSettlement(id: number): Observable<Response> {
        return this.http.delete<Response>(`api/hours-settlement/${id}`);
    }

    createHoursSettlement(form: HoursSettlementForm): Observable<Response> {
        return this.http.post<Response>('api/hours-settlement', form);
    }
}
