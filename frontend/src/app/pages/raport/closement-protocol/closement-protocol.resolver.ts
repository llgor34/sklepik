import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { SellmentCloseRaport } from 'src/app/interfaces/sellment-close-product.interface';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';

@Injectable({
    providedIn: 'root',
})
export class ClosementProtocolResolver implements Resolve<SellmentCloseRaport> {
    constructor(private sellmentCloseService: SellmentCloseRaportService) {}

    resolve(): Observable<SellmentCloseRaport> {
        return this.sellmentCloseService.getProducts().pipe(map((res) => res.data));
    }
}
