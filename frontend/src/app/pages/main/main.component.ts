import { Component } from '@angular/core';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { Version } from 'src/app/interfaces/version.interface';
import { VersionService } from 'src/app/services/version.service';
import { WorkersService } from 'src/app/services/workers.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent {
    version$: Observable<Version>;
    workedHoursAmount$: Observable<number>;
    usedDiscount$: Observable<number>;
    owedDiscount$: Observable<number>;
    remainingDiscount$: Observable<number>;

    constructor(private versionService: VersionService, private workersService: WorkersService) {
        this.version$ = this.versionService.getVersion$();
        this.workedHoursAmount$ = this.workersService.getWorkerWorkedHours$();
        this.usedDiscount$ = this.workersService.getWorkerUsedDiscount$().pipe(shareReplay(1));
        this.owedDiscount$ = this.workersService.getWorkerOwedDiscount$().pipe(shareReplay(1));
        this.remainingDiscount$ = combineLatest([this.usedDiscount$, this.owedDiscount$]).pipe(
            map(([usedDiscount, remainingDiscount]) => usedDiscount + remainingDiscount)
        );
    }
}
