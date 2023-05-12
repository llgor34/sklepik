import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/date.service';
import { CoffeeSubscriber } from 'src/app/interfaces/coffee-subscribers.interface';

@Component({
  selector: 'app-sell-coffee-subscribers',
  templateUrl: './sell-coffee-subscribers.component.html',
  styleUrls: ['./sell-coffee-subscribers.component.css'],
})
export class SellCoffeeSubscribersComponent implements OnInit {
  subscribers: CoffeeSubscriber[] = [];
  currentDate = '';

  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.subscribers = this.route.snapshot.data['coffeeSubscribers'];
    this.currentDate = this.dateService.getFullDate();
  }

  isSubscriptionUsedToday(subscriber: CoffeeSubscriber) {
    return subscriber.daty_odebranych_kaw.at(-1) === this.currentDate;
  }
}
