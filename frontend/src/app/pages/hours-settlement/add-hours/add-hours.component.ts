import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { ToastService } from 'src/app/services/toast.service';
import { WorkersService } from 'src/app/services/workers.service';

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
  shouldResetForm = true;

  constructor(
    private router: Router,
    private workersService: WorkersService,
    private activitiesService: ActivitiesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getWorkers();
    this.getActivities();
  }

  getWorkers() {
    this.workersService
      .getWorkers()
      .subscribe((workers) => (this.workers = workers));
  }

  getActivities() {
    this.activitiesService
      .getActivities()
      .subscribe((activities) => (this.activities = activities));
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
      if (this.shouldResetForm) {
        this.router.navigateByUrl('/hours-settlement');
      }
      this.toastService.showSuccess('Dodano godziny robocze');
    });
  }
}
