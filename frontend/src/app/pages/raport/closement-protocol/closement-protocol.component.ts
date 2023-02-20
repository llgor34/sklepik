import { Component } from '@angular/core';
import { DateService } from 'src/app/date.service';

@Component({
  selector: 'app-closement-protocol',
  templateUrl: './closement-protocol.component.html',
  styleUrls: ['./closement-protocol.component.css'],
})
export class ClosementProtocolComponent {
  todayDate = '';

  constructor(dateService: DateService) {
    this.todayDate = dateService.getShortTodayDate();
  }
}
