import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { Worker } from 'src/app/interfaces/worker.interface';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.workers = data['workers'];
    this.activities = data['activities'];
  }

  checkActivity() {
    this.isOtherActivity = +this.activityId === 1;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
