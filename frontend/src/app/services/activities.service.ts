import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityResponse } from '../interfaces/activity.interface';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getActivities() {
    return this.http
      .get<ActivityResponse>('api/get-activities')
      .pipe(map((res) => res.activities));
  }
}
