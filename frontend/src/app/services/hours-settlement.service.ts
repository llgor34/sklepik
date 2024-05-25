import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HoursSettlement } from '../interfaces/hours-settlement.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class HoursSettlementService {
    constructor(private http: HttpClient) {}

    getHoursSettlement$ = (): Observable<HoursSettlement[]> => {
        return this.http.get<Response<HoursSettlement[]>>('api/hours-settlement').pipe(map((res) => res.data));
    };

    createHoursSettlement$ = (hoursSettlement: HoursSettlement): Observable<number> => {
        return this.http.post<Response<number>>('api/hours-settlement', hoursSettlement).pipe(map((res) => res.data));
    };

    deleteHoursSettlement$ = (id: number): Observable<Response> => {
        return this.http.delete<Response>(`api/hours-settlement/${id}`);
    };

    updateHoursSettlement$ = (id: number, fieldData: Partial<HoursSettlement>): Observable<Response> => {
        return this.http.put<Response>(`api/hours-settlement/${id}`, fieldData);
    };
}
