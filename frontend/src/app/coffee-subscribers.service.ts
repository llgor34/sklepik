import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from './interfaces/response.interface';
import { CoffeeSubscriber } from './interfaces/coffee-subscribers.interface';
import { map } from 'rxjs';
import { CoffeeSubscriberUpdateType } from './interfaces/coffee-subscriber-update.interface';

interface CoffeeSubscriberResponse extends Response {
  coffeeSubscribers: CoffeeSubscriber[];
}

@Injectable({
  providedIn: 'root',
})
export class CoffeeSubscribersService {
  constructor(private http: HttpClient) {}

  getSubscribers$() {
    return this.http
      .get<CoffeeSubscriberResponse>('api/coffee-subscribers')
      .pipe(map((res) => res.coffeeSubscribers));
  }

  updateCoffeeSubscriber(clientId: number, updateByAmount: number) {
    return this.http.get<Response>(
      `api/coffee-subscribers/update/${clientId}/${updateByAmount}`
    );
  }

  useCoffeeSubscription(clientId: number) {
    return this.http.get<Response>(
      `api/coffee-subscribers/receive-coffee/${clientId}`
    );
  }
}
