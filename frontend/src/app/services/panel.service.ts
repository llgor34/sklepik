import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { GetFn } from '../interfaces/get-fn.interface';
import { UpdateFn, updateObj } from '../interfaces/update-fn.interface';
import { DeleteFn } from '../interfaces/delete-fn.interface';
import { CreateFn } from '../interfaces/create-fn.interface';
import { Response } from '../interfaces/response.interface';
import { PANEL_SERVICE_ENDPOINT } from '../constants/endpoint.constant';
import { OrderType } from '../interfaces/order-type.interface';

@Injectable()
export class PanelService<T> {
    protected http = inject(HttpClient);
    protected endpoint: string = inject(PANEL_SERVICE_ENDPOINT);

    protected orderBy: string | null = null;
    protected orderType: OrderType = 'desc';

    setOrderBy(orderBy: string): void {
        this.orderBy = orderBy;
    }

    getOrderBy(): string | null {
        return this.orderBy;
    }

    toggleOrderType(): void {
        this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
    }

    getRecords$: GetFn<T> = () => {
        if (this.orderBy) {
            return this.http
                .get<Response<T[]>>(this.endpoint, { params: { orderBy: this.orderBy, orderType: this.orderType } })
                .pipe(map((res) => res.data));
        }
        return this.http.get<Response<T[]>>(this.endpoint).pipe(map((res) => res.data));
    };

    updateRecord$: UpdateFn = (id: number, recordData: updateObj) => {
        return this.http.put<Response>(`${this.endpoint}/${id}`, recordData);
    };

    deleteRecord$: DeleteFn = (id: number) => {
        return this.http.delete<Response>(`${this.endpoint}/${id}`);
    };

    createRecord$: CreateFn = (recordData: updateObj) => {
        return this.http.post<Response<number>>(this.endpoint, recordData).pipe(map((res) => res.data));
    };
}
