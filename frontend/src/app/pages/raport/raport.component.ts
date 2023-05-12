import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['../card.css'],
})
export class RaportComponent {
  raports: Card[] = [
    {
      imageUrl: 'assets/img1.png',
      title: 'Protokół zamknięcia',
      description: 'Wygeneruj dzienny raport zamknięcia sklepiku.',
      url: 'closement-protocol',
    },
  ];
}
