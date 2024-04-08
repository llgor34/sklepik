import { Component, ViewChild } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListTableComponent } from 'src/app/component/list-table/list-table.component';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';

@Component({
    selector: 'app-hours-settlement',
    templateUrl: './hours-settlement.component.html',
    styleUrls: ['./hours-settlement.component.css'],
})
export class HoursSettlementComponent {
    @ViewChild(ListTableComponent, { static: true })
    listTableComponent!: ListTableComponent<HoursSettlement>;

    records$: Observable<HoursSettlement[]> = this.hoursSettlementService.getHoursSettlement();
    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    constructor(
        private hoursSettlementService: HoursSettlementService,
        private toastService: ToastService,
        private router: Router
    ) {}

    addHoursSettlementRecord() {
        this.router.navigateByUrl('/hours-settlement/add');
    }

    deleteHoursSettlementRecord(record: NumeratedHoursSettlement) {
        this.hoursSettlementService.deleteHoursSettlement(record.id).subscribe(() => {
            this.listTableComponent.removeRecordByIdx(record.idx);
            this.toastService.showSuccess(`Pomyślnie usunięto rekord!`);
        });
    }
}
