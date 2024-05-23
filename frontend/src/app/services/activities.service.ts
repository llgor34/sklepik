import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity.interface';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    private ENABLED_ACTIVITY_DESCRIPTION_IDS: number[] = [1];

    constructor(private http: HttpClient) {}

    getActivities$(): Observable<Activity[]> {
        return this.http.get<Response<Activity[]>>('api/activities').pipe(map((res) => res.data));
    }

    isActivitityDescriptionEnabled(id: number) {
        return this.ENABLED_ACTIVITY_DESCRIPTION_IDS.includes(id);
    }
}
