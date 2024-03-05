import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders$().subscribe(console.log);
  }
}
