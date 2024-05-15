import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker, WorkersResponse } from '../interfaces/worker.interface';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    constructor(private http: HttpClient) {}

    getWorkers$(): Observable<Worker[]> {
        return this.http.get<WorkersResponse>('api/workers').pipe(map((res) => res.workers));
    }
}
