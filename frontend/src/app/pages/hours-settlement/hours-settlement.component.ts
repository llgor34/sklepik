import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-hours-settlement',
  templateUrl: './hours-settlement.component.html',
  styleUrls: ['./hours-settlement.component.css'],
})
export class HoursSettlementComponent {
  cards: Card[] = [
    {
      imageUrl: 'assets/worked-hours.png',
      title: 'Wprowadzanie godzin',
      description: 'Wprowadź godziny za pracę dla pracowników.',
      url: 'add',
    },
  ];
}
