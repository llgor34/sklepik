import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { NewHoursSettlementComponent } from './new-hours-settlement/new-hours-settlement.component';

@Component({
    selector: 'app-panel-hours-settlement',
    templateUrl: './panel-hours-settlement.component.html',
    styleUrls: ['./panel-hours-settlement.component.css'],
})
export class PanelHoursSettlementComponent extends PanelComponent<HoursSettlement> implements OnInit {
    hoursSettlementService: HoursSettlementService = inject(HoursSettlementService);
    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    @ViewChild(NewHoursSettlementComponent, { static: false })
    newHoursSettlementComponent!: NewHoursSettlementComponent;

    ngOnInit(): void {
        super.initializeComponent(
            this.hoursSettlementService.getHoursSettlement$(),
            this.hoursSettlementService.updateHoursSettlement$,
            this.hoursSettlementService.deleteHoursSettlement$,
            this.hoursSettlementService.createHoursSettlement$
        );
    }

    onAddNewEmptyRecord() {
        this.newHoursSettlementComponent.addRecord();
    }
}
