import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetFn } from '../interfaces/get-fn.interface';
import { UpdateFn, updateObj } from '../interfaces/update-fn.interface';
import { DeleteFn } from '../interfaces/delete-fn.interface';
import { CreateFn } from '../interfaces/create-fn.interface';
import { Response } from '../interfaces/response.interface';
import { PANEL_SERVICE_ENDPOINT } from '../constants/endpoint.constant';

@Injectable()
export class PanelService<T> {
    protected http = inject(HttpClient);
    protected endpoint: string = inject(PANEL_SERVICE_ENDPOINT);

    getRecords$: GetFn<T> = () => {
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
