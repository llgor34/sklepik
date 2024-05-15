import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, ActivityResponse } from '../interfaces/activity.interface';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    constructor(private http: HttpClient) {}

    getActivities(): Observable<Activity[]> {
        return this.http.get<ActivityResponse>('api/activities').pipe(map((res) => res.activities));
    }
}
