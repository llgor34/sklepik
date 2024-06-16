import { Component, OnInit, inject } from '@angular/core';
import { HoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { Observable, shareReplay } from 'rxjs';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { UserEditableService } from 'src/app/services/user-editable.service';
import { ActivitiesEditableService } from 'src/app/services/activities-editable.service';
import { NewRecordService } from 'src/app/services/new-record.service';
import { PanelService } from 'src/app/services/panel.service';
import { providePanelServiceEndpoint } from 'src/app/constants/endpoint.constant';

@Component({
    selector: 'app-panel-hours-settlement',
    templateUrl: './panel-hours-settlement.component.html',
    styleUrls: ['./panel-hours-settlement.component.css'],
    providers: [NewRecordService, PanelService, providePanelServiceEndpoint('api/hours-settlement')],
})
export class PanelHoursSettlementComponent extends PanelComponent<HoursSettlement> implements OnInit {
    userEditableService: UserEditableService = inject(UserEditableService);
    activitiesEditableService: ActivitiesEditableService = inject(ActivitiesEditableService);

    users$: Observable<EditableItem[]> = this.userEditableService.getUsersEditable$().pipe(shareReplay(1));
    activities$: Observable<EditableItem[]> = this.activitiesEditableService
        .getActivitiesEditable$()
        .pipe(shareReplay(1));

    override getEmptyRecord(): HoursSettlement {
        return new HoursSettlement();
    }
}
