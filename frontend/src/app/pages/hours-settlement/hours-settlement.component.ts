import { Component, OnInit } from '@angular/core';
import { HoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
    selector: 'app-hours-settlement',
    templateUrl: './hours-settlement.component.html',
    styleUrls: ['./hours-settlement.component.css'],
    providers: [FilterPipe],
})
export class HoursSettlementComponent implements OnInit {
    records!: HoursSettlement[];
    records$!: Observable<HoursSettlement[]>;
    searchValue$ = new BehaviorSubject('');

    constructor(
        private hoursSettlementService: HoursSettlementService,
        private toastService: ToastService,
        private router: Router,
        private filterPipe: FilterPipe
    ) {}

    ngOnInit() {
        this.records$ = combineLatest([this.hoursSettlementService.getHoursSettlement(), this.searchValue$]).pipe(
            map(([records, searchValue]) => this.filterPipe.transform(records, searchValue)!)
        );
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
