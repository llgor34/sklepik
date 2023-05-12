import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-sell-default',
  templateUrl: './sell-default.component.html',
})
export class SellDefaultComponent {
  cards: Card[] = [
    {
      imageUrl: 'assets/img1.png',
      title: 'Towary i produkty',
      description: 'Sprzedaż towarów, produktów, usług.',
      url: 'products',
    },
    {
      imageUrl: 'assets/img1.png',
      title: 'Kawonament',
      description: 'Sprzedaż i obsługa abonamentów na kawe.',
      url: 'coffee',
    },
  ];

  constructor(public authService: AuthService) {}
}
