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
    ];
}
