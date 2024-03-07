import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityCreateForm, ActivityResponse } from '../interfaces/activity.interface';
import { map } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    constructor(private http: HttpClient) {}

    getActivities() {
        return this.http.get<ActivityResponse>('api/activities/get').pipe(map((res) => res.activities));
    }

    createActivity(form: ActivityCreateForm) {
        return this.http.post<Response>('api/activities/create', form);
    }
}
