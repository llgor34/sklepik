import { Component } from '@angular/core';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { Version } from 'src/app/interfaces/version.interface';
import { DiscountService } from 'src/app/services/discount.service';
import { VersionService } from 'src/app/services/version.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    version$: Observable<Version> = this.versionService.getVersion$();
    workedHoursAmount$: Observable<number> = this.discountService.getCurrentWorkerWorkedHours$().pipe(shareReplay(1));
    usedDiscount$: Observable<number> = this.discountService.getCurrentWorkerUsedDiscount$().pipe(shareReplay(1));
    owedDiscount$: Observable<number> = this.discountService.getCurrentWorkerOwedDiscount$().pipe(shareReplay(1));

    remainingDiscount$: Observable<number> = combineLatest([this.usedDiscount$, this.owedDiscount$]).pipe(
        map(([usedDiscount, remainingDiscount]) => usedDiscount + remainingDiscount)
    );

    constructor(private versionService: VersionService, private discountService: DiscountService) {}
}
