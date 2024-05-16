import { Component, OnInit } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';

@Component({
    selector: 'app-hours-settlement',
    templateUrl: './hours-settlement.component.html',
    styleUrls: ['./hours-settlement.component.css'],
})
export class HoursSettlementComponent implements OnInit {
    records$!: Observable<HoursSettlement[]>;
    refreshRecords$ = new BehaviorSubject(null);
    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    constructor(
        private hoursSettlementService: HoursSettlementService,
        private toastService: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.records$ = this.refreshRecords$.pipe(
            switchMap(() => this.hoursSettlementService.getHoursSettlement$()),
            shareReplay(1)
        );
    }

    addHoursSettlementRecord() {
        this.router.navigateByUrl('/hours-settlement/add');
    }

    deleteHoursSettlementRecord(record: NumeratedHoursSettlement) {
        this.hoursSettlementService.deleteHoursSettlement$(record.id).subscribe(() => {
            this.refreshRecords();
            this.toastService.showSuccess(`Pomyślnie usunięto rekord!`);
        });
    }

    refreshRecords() {
        this.refreshRecords$.next(null);
    }
}
