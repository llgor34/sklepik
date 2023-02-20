import { Component } from '@angular/core';
import { Raport } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.css'],
})
export class RaportComponent {
  raports: Raport[] = [
    {
      imageUrl: 'assets/img1.png',
      title: 'Protokół zamknięcia',
      description: 'Wygeneruj dzienny raport zamknięcia sklepiku.',
      url: 'closement-protocol',
    },
  ];
}
