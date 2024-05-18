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
import { User } from 'src/app/interfaces/user.interface';
import { Activity } from 'src/app/interfaces/activity.interface';

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

    users$: Observable<EditableItem[]> = this.userService.getUsers$().pipe(
        shareReplay(1),
        map((users) => this.mapUsersToEditable(users))
    );
    activities$: Observable<EditableItem[]> = this.activitiesService.getActivities().pipe(
        shareReplay(1),
        map((activities) => this.mapActivitiesToEditable(activities))
    );

    mapUsersToEditable(users: User[]): EditableItem[] {
        return users.map<EditableItem>((user) => ({ id: user.id!, label: `${user.name} ${user.surname}` }));
    }

    mapActivitiesToEditable(activities: Activity[]): EditableItem[] {
        return activities.map<EditableItem>((activity) => ({ id: activity.id, label: activity.name }));
    }

    getWorkerEditableById$(id: number): Observable<EditableItem> {
        return this.users$.pipe(map((users) => users.filter((user) => user.id === id)[0]));
    }

    getActivityById$(id: number) {
        return this.activities$.pipe(map((activities) => activities.filter((activity) => activity.id === id)[0]));
    }

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
