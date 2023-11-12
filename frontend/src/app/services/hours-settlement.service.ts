import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';
import { HoursSettlementResponse } from '../interfaces/hours-settlement.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class HoursSettlementService {
  constructor(private http: HttpClient) {}

  getUsedDiscount(workerCode: string) {
    return this.http
      .get<UsedDiscountResponse>(`api/workers/get-used-discount/${workerCode}`)
      .pipe(map((res) => res.usedDiscount));
  }

  getOwedDiscount(workerCode: string) {
    return this.http
      .get<OwedDiscountResponse>(`api/workers/get-owed-discount/${workerCode}`)
      .pipe(map((res) => res.owedDiscount));
  }

  getHoursSettlement() {
    return this.http
      .get<HoursSettlementResponse>('api/hours-settlement/get')
      .pipe(map((res) => res.hoursSettlement));
  }

  deleteHoursSettlement(id: number) {
    return this.http.get<Response>(`api/hours-settlement/delete/${id}`);
  }
}
