import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Activity } from 'src/app/interfaces/activity.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
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

    activityIdsWithDescription = [1, 7];
    activityId = 1;
    isActivityWithoutDescription = true;

    constructor(
        private workersService: WorkersService,
        private activitiesService: ActivitiesService,
        private hoursSettlementService: HoursSettlementService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.getWorkers$();
        this.getActivities();
        this.checkActivity();
    }

    getWorkers$() {
        this.workersService.getWorkers$().subscribe((workers) => (this.workers = workers));
    }

    getActivities() {
        this.activitiesService.getActivities().subscribe((activities) => (this.activities = activities));
    }

    checkActivity() {
        for (let activityId of this.activityIdsWithDescription) {
            if (+this.activityId === activityId) {
                this.isActivityWithoutDescription = false;
                return;
            }
        }
        this.isActivityWithoutDescription = true;
    }

    onSubmit() {
        const { workerId, activityId } = this.form.value;
        const formValue = {
            ...this.form.value,
            workerId: +workerId,
            activityId: +activityId,
        };

        this.hoursSettlementService.createHoursSettlement(formValue).subscribe(() => {
            this.toastService.showSuccess('Dodano godziny robocze');
        });
    }
}
