import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.css'],
})
export class AddHoursComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  workers: Worker[] = [];
  activities: Activity[] = [];

  activityId = '1';
  isOtherActivity = true;

  constructor(
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.workers = data['workers'];
    this.activities = data['activities'];
  }

  checkActivity() {
    this.isOtherActivity = +this.activityId === 1;
  }

  onSubmit() {
    const { workerId, activityId } = this.form.value;
    const formValue = {
      ...this.form.value,
      workerId: +workerId,
      activityId: +activityId,
    };

    this.activitiesService.createActivity(formValue).subscribe(() => {
      this.form.reset();
      this.toastService.showSuccess('Dodano godziny robocze');
    });
  }
}
