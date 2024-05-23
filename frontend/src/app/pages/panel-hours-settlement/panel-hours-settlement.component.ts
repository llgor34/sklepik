import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { NewHoursSettlementComponent } from './new-hours-settlement/new-hours-settlement.component';
import { Observable, shareReplay } from 'rxjs';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { UserEditableService } from 'src/app/services/user-editable.service';
import { ActivitiesEditableService } from 'src/app/services/activities-editable.service';

@Component({
    selector: 'app-panel-hours-settlement',
    templateUrl: './panel-hours-settlement.component.html',
    styleUrls: ['./panel-hours-settlement.component.css'],
})
export class PanelHoursSettlementComponent extends PanelComponent<HoursSettlement> implements OnInit {
    hoursSettlementService: HoursSettlementService = inject(HoursSettlementService);
    userEditableService: UserEditableService = inject(UserEditableService);
    activitiesEditableService: ActivitiesEditableService = inject(ActivitiesEditableService);

    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    @ViewChild(NewHoursSettlementComponent, { static: false })
    newHoursSettlementComponent!: NewHoursSettlementComponent;

    users$: Observable<EditableItem[]> = this.userEditableService.getUsersEditable$().pipe(shareReplay(1));
    activities$: Observable<EditableItem[]> = this.activitiesEditableService
        .getActivitiesEditable$()
        .pipe(shareReplay(1));

    ngOnInit(): void {
        super.initializeComponent(
            this.hoursSettlementService.getHoursSettlement$(),
            this.hoursSettlementService.updateHoursSettlement$,
            this.hoursSettlementService.deleteHoursSettlement$,
            this.hoursSettlementService.createHoursSettlement$
        );
    }

    getUserEditableById$(id: number): Observable<EditableItem> {
        return this.userEditableService.getUserEditableById$(this.users$, id);
    }

    getActivityEditableById$(id: number): Observable<EditableItem> {
        return this.activitiesEditableService.getActivityEditableById$(this.activities$, id);
    }

    onAddNewEmptyRecord() {
        this.newHoursSettlementComponent.addRecord();
    }
}
