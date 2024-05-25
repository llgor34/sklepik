import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker } from '../interfaces/worker.interface';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    constructor(private http: HttpClient) {}

    getWorkers$(): Observable<Worker[]> {
        return this.http.get<Response<Worker[]>>('api/workers').pipe(map((res) => res.data));
    }
}
