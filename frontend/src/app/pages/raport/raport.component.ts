import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
})
export class RaportComponent {
  cards: Card[] = [
    {
      imageUrl: 'assets/daily-raport.png',
      title: 'Protokół zamknięcia',
      description: 'Wygeneruj dzienny raport zamknięcia sklepiku.',
      url: 'closement-protocol',
    },
  ];
}
