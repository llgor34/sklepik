import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivitiesService } from 'src/app/services/activities.service';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesResolver implements Resolve<Activity[]> {
  constructor(private activitiesService: ActivitiesService) {}

  resolve() {
    return this.activitiesService.getActivities();
  }
}
