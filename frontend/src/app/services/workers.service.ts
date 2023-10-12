import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkersResponse } from '../interfaces/worker.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  constructor(private http: HttpClient) {}

  getWorkers() {
    return this.http
      .get<WorkersResponse>('api/workers/get')
      .pipe(map((res) => res.workers));
  }
}
