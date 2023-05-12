import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoffeeSubscriber } from 'src/app/interfaces/coffee-subscribers.interface';

@Component({
  selector: 'app-sell-coffee-subscribers',
  templateUrl: './sell-coffee-subscribers.component.html',
})
export class SellCoffeeSubscribersComponent implements OnInit {
  subscribers: CoffeeSubscriber[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscribers = this.route.snapshot.data['coffeeSubscribers'];
    console.log(this.subscribers);
  }
}
