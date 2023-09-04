export interface CoffeeSubscriberResponse extends Response {
  coffeeSubscribers: CoffeeSubscriber[];
}

export interface CoffeeSubscriber {
  client_id: number;
  name: string;
  surname: string;
  mail: string;
  coffees_left: number;
  coffees_receive_datetimes: string[];
}
