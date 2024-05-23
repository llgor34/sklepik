import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';
import { EditableItem } from '../interfaces/editable-item.interface';
import { ActivitiesService } from './activities.service';

@Injectable({
    providedIn: 'root',
})
export class ActivitiesEditableService {
    activitiesService: ActivitiesService = inject(ActivitiesService);

    getActivitiesEditable(): Observable<EditableItem[]> {
        return this.activitiesService.getActivities$().pipe(map(this.mapActivitiesToEditable));
    }

    getActivityEditableById$(activitiesEditable$: Observable<EditableItem[]>, id: number) {
        return activitiesEditable$.pipe(map((activities) => activities.filter((activity) => activity.id === id)[0]));
    }

    private mapActivitiesToEditable = (activities: Activity[]): EditableItem[] => {
        return activities.map<EditableItem>((activity) => ({ id: activity.id, label: activity.name }));
    };
}
