import { Component, OnInit } from '@angular/core';
import { CoffeeSubscribersService } from 'src/app/services/coffee-subscribers.service';
import { DateService } from 'src/app/services/date.service';
import { CoffeeSubscriber } from 'src/app/interfaces/coffee-subscribers.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-sell-coffee-subscribers',
    templateUrl: './sell-coffee-subscribers.component.html',
    styleUrls: ['./sell-coffee-subscribers.component.css'],
})
export class SellCoffeeSubscribersComponent implements OnInit {
    subscribers: CoffeeSubscriber[] = [];
    currentDate = '';

    constructor(
        private dateService: DateService,
        private coffeeSubscribersService: CoffeeSubscribersService,
        private toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.getSubscribers();
        this.currentDate = this.dateService.getLongDate();
    }

    isSubscriptionUsedToday(subscriber: CoffeeSubscriber) {
        const date = subscriber.coffees_receive_datetimes[0]?.split(' ')[0];
        return date == this.currentDate;
    }

    updateCoffeesLeftBy(subscriberIdx: number, updateByAmount: number) {
        const subscriber = this.getSubscriberByIdx(subscriberIdx);

        this.coffeeSubscribersService.updateCoffeeSubscriber(subscriber.client_id, updateByAmount).subscribe(() => {
            this.toastService.showSuccess('Zmodyfikowano liczbę kaw');
            this.getSubscribers();
        });
    }

    useCoffeeSubscription(subscriberIdx: number) {
        const subscriber = this.getSubscriberByIdx(subscriberIdx);

        this.coffeeSubscribersService.useCoffeeSubscription(subscriber.client_id).subscribe(() => {
            this.toastService.showSuccess('Użyto kawonamentu');
            this.getSubscribers();
        });
    }

    getSubscribers() {
        this.coffeeSubscribersService.getSubscribers().subscribe((subscribers) => (this.subscribers = subscribers));
    }

    getSubscriberByIdx(idx: number) {
        return this.subscribers[idx];
    }
}
