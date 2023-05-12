import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CoffeeSubscribersService } from 'src/app/coffee-subscribers.service';
import { CoffeeSubscriber } from 'src/app/interfaces/coffee-subscribers.interface';

@Injectable({ providedIn: 'root' })
export class SellCoffeeSubscribersResolver
  implements Resolve<CoffeeSubscriber[]>
{
  constructor(private service: CoffeeSubscribersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getSubscribers$();
  }
}
