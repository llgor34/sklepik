import { Component } from '@angular/core';
import { NewRecordComponent } from 'src/app/component/new-record/new-record.component';
import { HoursSettlement } from 'src/app/interfaces/hours-settlement.interface';

@Component({
    selector: 'app-new-hours-settlement',
    templateUrl: './new-hours-settlement.component.html',
    styleUrls: ['./new-hours-settlement.component.css', '../../panel-default/panel-new-record.component.css'],
})
export class NewHoursSettlementComponent extends NewRecordComponent<HoursSettlement> {
    override addRecord(): void {
        super.addRecord(new HoursSettlement());
    }
}
