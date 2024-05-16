import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HoursSettlement } from '../interfaces/hours-settlement.interface';
import { Response } from '../interfaces/response.interface';
import { DateService } from './date.service';
import { HoursSettlementForm } from '../interfaces/activity.interface';

@Injectable({
    providedIn: 'root',
})
export class HoursSettlementService {
    constructor(private http: HttpClient, private dateService: DateService) {}

    getHoursSettlement$(): Observable<HoursSettlement[]> {
        return this.http.get<Response<HoursSettlement[]>>('api/hours-settlement').pipe(
            map((res) => res.data),
            map((hoursSettlement) =>
                hoursSettlement.map((hourSettlement) => ({
                    ...hourSettlement,
                    work_date: this.dateService.formateDate(hourSettlement.work_date, 'DD.MM.yyyy'),
                }))
            )
        );
    }

    deleteHoursSettlement$(id: number): Observable<Response> {
        return this.http.delete<Response>(`api/hours-settlement/${id}`);
    }

    createHoursSettlement$(form: HoursSettlementForm): Observable<Response> {
        return this.http.post<Response>('api/hours-settlement', form);
    }

    updateHoursSettlement$(hoursSettlement: HoursSettlement): Observable<Response> {
        return this.http.put<Response>(`api/hours-settlement/${hoursSettlement.id}`, hoursSettlement);
    }
}
