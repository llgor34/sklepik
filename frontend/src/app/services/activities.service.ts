import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity.interface';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
    constructor(private http: HttpClient) {}

    getActivities(): Observable<Activity[]> {
        return this.http.get<Response<Activity[]>>('api/activities').pipe(map((res) => res.data));
    }

    getActivitiesEditable(): Observable<EditableItem[]> {
        return this.getActivities().pipe(map(this.mapActivitiesToEditable));
    }

    getActivityEditableById$(activitiesEditable$: Observable<EditableItem[]>, id: number) {
        return activitiesEditable$.pipe(map((activities) => activities.filter((activity) => activity.id === id)[0]));
    }

    private mapActivitiesToEditable = (activities: Activity[]): EditableItem[] => {
        return activities.map<EditableItem>((activity) => ({ id: activity.id, label: activity.name }));
    };
}
