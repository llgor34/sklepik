import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
    selector: 'app-panel-default',
    templateUrl: './panel-default.component.html',
    styleUrls: ['./panel-default.component.css'],
})
export class PanelDefaultComponent {
    cards: Card[] = [
        {
            title: 'Produkty',
            description: 'Panel do zarządzania produktami',
            imageUrl: 'assets/products-panel.png',
            url: 'products',
        },
        {
            title: 'Użytkownicy',
            description: 'Panel do zarządzania użytkownikami',
            imageUrl: 'assets/users-panel.svg',
            url: 'users',
        },
        {
            title: 'Godziny pracy',
            description: 'Panel do zarządzania godzinami pracy',
            imageUrl: 'assets/hours-settlement-panel.svg',
            url: 'hours-settlement',
        },
    ];
}
