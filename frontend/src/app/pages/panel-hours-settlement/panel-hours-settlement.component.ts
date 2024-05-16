import { Component, OnInit } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { PanelComponent } from 'src/app/component/panel/panel.component';

@Component({
    selector: 'app-panel-hours-settlement',
    templateUrl: './panel-hours-settlement.component.html',
    styleUrls: ['./panel-hours-settlement.component.css'],
})
export class PanelHoursSettlementComponent extends PanelComponent<HoursSettlement> implements OnInit {
    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    constructor(private hoursSettlementService: HoursSettlementService) {
        super();
    }

    ngOnInit(): void {
        super.initializeComponent(
            this.hoursSettlementService.getHoursSettlement$(),
            this.hoursSettlementService.updateHoursSettlement$,
            this.hoursSettlementService.deleteHoursSettlement$,
            this.hoursSettlementService.createHoursSettlement$
        );
    }
    // records$!: Observable<HoursSettlement[]>;
    // refreshRecords$ = new BehaviorSubject(null);

    // constructor(
    //     private hoursSettlementService: HoursSettlementService,
    //     private toastService: ToastService,
    //     private router: Router
    // ) {}

    // ngOnInit(): void {
    //     this.records$ = this.refreshRecords$.pipe(
    //         switchMap(() => this.hoursSettlementService.getHoursSettlement$()),
    //         shareReplay(1)
    //     );
    // }

    // addHoursSettlementRecord() {
    //     this.router.navigateByUrl('/hours-settlement/add');
    // }

    // deleteHoursSettlementRecord(record: NumeratedHoursSettlement) {
    //     this.hoursSettlementService.deleteHoursSettlement$(record.id).subscribe(() => {
    //         this.refreshRecords();
    //         this.toastService.showSuccess(`Pomyślnie usunięto rekord!`);
    //     });
    // }

    // refreshRecords() {
    //     this.refreshRecords$.next(null);
    // }
}
