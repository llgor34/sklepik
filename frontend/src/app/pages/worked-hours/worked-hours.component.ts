import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-worked-hours',
  templateUrl: './worked-hours.component.html',
  styleUrls: ['./worked-hours.component.css'],
})
export class WorkedHoursComponent {
  cards: Card[] = [
    {
      imageUrl: 'assets/worked-hours.png',
      title: 'Wprowadzanie godzin',
      description: 'Wprowadź godziny za pracę dla pracowników.',
      url: '',
    },
  ];
}
