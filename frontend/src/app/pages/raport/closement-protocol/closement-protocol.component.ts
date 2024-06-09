import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SellmentCloseRaport } from 'src/app/interfaces/sellment-close-product.interface';
import { DateService } from 'src/app/services/date.service';
import { SellmentCloseRaportService } from 'src/app/services/sellment-close-raport.service';

@Component({
    selector: 'app-closement-protocol',
    templateUrl: './closement-protocol.component.html',
})
export class ClosementProtocolComponent {
    raport$: Observable<SellmentCloseRaport> = this.sellmentCloseRaportService.getProducts$();
    todayDate = this.dateService.getDate();

    constructor(private sellmentCloseRaportService: SellmentCloseRaportService, private dateService: DateService) {}
}
