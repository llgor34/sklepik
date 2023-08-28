import { Component, OnInit } from '@angular/core';
import { CoffeeSubscribersService } from 'src/app/coffee-subscribers.service';
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
  searchValue = '';

  constructor(
    private dateService: DateService,
    private coffeeSubscribersService: CoffeeSubscribersService
  ) {}

  ngOnInit(): void {
    this.getSubscribers();
    this.currentDate = this.dateService.getDate();
  }

  getSubscribers() {
    this.coffeeSubscribersService
      .getSubscribers$()
      .subscribe((subscribers) => (this.subscribers = subscribers));
  }

  isSubscriptionUsedToday(subscriber: CoffeeSubscriber) {
    const date = subscriber.coffees_receive_datetimes[0]?.split(' ')[0];
    return date == this.currentDate;
  }

  updateCoffeesLeftBy(subscriberIdx: number, updateByAmount: number) {
    const subscriber = this.getSubscriberByIdx(subscriberIdx);

    this.coffeeSubscribersService
      .updateCoffeeSubscriber(subscriber.client_id, updateByAmount)
      .subscribe(this.getSubscribers.bind(this));
  }

  useCoffeeSubscription(subscriberIdx: number) {
    const subscriber = this.getSubscriberByIdx(subscriberIdx);

    this.coffeeSubscribersService
      .useCoffeeSubscription(subscriber.client_id)
      .subscribe(this.getSubscribers.bind(this));
  }

  getSubscriberByIdx(idx: number) {
    return this.subscribers[idx];
  }
}
