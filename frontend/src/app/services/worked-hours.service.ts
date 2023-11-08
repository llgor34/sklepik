import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkedHoursService {
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
}
