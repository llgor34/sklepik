import { Component, OnInit } from '@angular/core';
import { HoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/interfaces/page.interface';

@Component({
    selector: 'app-hours-settlement',
    templateUrl: './hours-settlement.component.html',
    styleUrls: ['./hours-settlement.component.css'],
})
export class HoursSettlementComponent implements OnInit {
    records!: HoursSettlement[];
    records$!: Observable<HoursSettlement[]>;
    searchValue = '';

    constructor(
        private hoursSettlementService: HoursSettlementService,
        private toastService: ToastService,
        private router: Router
    ) {}

    ngOnInit() {
        this.hoursSettlementService.getHoursSettlement().subscribe((records) => (this.records = records));
        this.records$ = this.hoursSettlementService.getHoursSettlement();
    }

    onPageChange(records: HoursSettlement[]) {
        this.records = records;
    }

    addHoursSettlementRecord() {
        this.router.navigateByUrl('/hours-settlement/add');
    }

    deleteHoursSettlementRecord(id: number) {
        this.hoursSettlementService.deleteHoursSettlement(id).subscribe(() => {
            this.removeHoursSettlementRecord(id);
            this.toastService.showSuccess(`Pomyślnie usunięto rekord!`);
        });
    }

    private removeHoursSettlementRecord(id: number) {
        this.records = this.records.filter((record) => record.id != id);
    }
}
