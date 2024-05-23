import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HoursSettlement, NumeratedHoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { HoursSettlementService } from 'src/app/services/hours-settlement.service';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { NewHoursSettlementComponent } from './new-hours-settlement/new-hours-settlement.component';
import { UserService } from 'src/app/services/user.service';
import { Observable, map, shareReplay, take, tap } from 'rxjs';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
    selector: 'app-panel-hours-settlement',
    templateUrl: './panel-hours-settlement.component.html',
    styleUrls: ['./panel-hours-settlement.component.css'],
})
export class PanelHoursSettlementComponent extends PanelComponent<HoursSettlement> implements OnInit {
    hoursSettlementService: HoursSettlementService = inject(HoursSettlementService);
    userService: UserService = inject(UserService);
    activitiesService: ActivitiesService = inject(ActivitiesService);

    tableBodyContext!: TableBodyContext<NumeratedHoursSettlement[]>;

    @ViewChild(NewHoursSettlementComponent, { static: false })
    newHoursSettlementComponent!: NewHoursSettlementComponent;

    users$: Observable<EditableItem[]> = this.userService.getUsersEditable$().pipe(shareReplay(1));
    activities$: Observable<EditableItem[]> = this.activitiesService.getActivitiesEditable().pipe(shareReplay(1));

    ngOnInit(): void {
        super.initializeComponent(
            this.hoursSettlementService.getHoursSettlement$(),
            this.hoursSettlementService.updateHoursSettlement$,
            this.hoursSettlementService.deleteHoursSettlement$,
            this.hoursSettlementService.createHoursSettlement$
        );
    }

    getUserEditableById$(id: number): Observable<EditableItem> {
        return this.userService.getUserEditableById$(this.users$, id);
    }

    getActivityEditableById$(id: number): Observable<EditableItem> {
        return this.activitiesService.getActivityEditableById$(this.activities$, id);
    }

    onAddNewEmptyRecord() {
        this.newHoursSettlementComponent.addRecord();
    }
}
