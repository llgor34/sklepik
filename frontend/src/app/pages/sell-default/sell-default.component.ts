import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
    selector: 'app-sell-default',
    templateUrl: './sell-default.component.html',
})
export class SellDefaultComponent {
    constructor(public authService: AuthService) {}

    cards: Card[] = [
        {
            imageUrl: 'assets/goods-and-services.png',
            title: 'Towary i produkty',
            description: 'Sprzedaż towarów, produktów, usług.',
            url: 'products',
            requiredRoles: [],
        },
    ];
}
