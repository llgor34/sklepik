import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, shareReplay } from 'rxjs';
import { NewRecordComponent } from 'src/app/component/new-record/new-record.component';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { HoursSettlement } from 'src/app/interfaces/hours-settlement.interface';
import { ActivitiesEditableService } from 'src/app/services/activities-editable.service';
import { ActivitiesService } from 'src/app/services/activities.service';
import { UserEditableService } from 'src/app/services/user-editable.service';

@Component({
    selector: 'app-new-hours-settlement',
    templateUrl: './new-hours-settlement.component.html',
    styleUrls: ['./new-hours-settlement.component.css', '../../panel-default/panel-new-record.component.css'],
})
export class NewHoursSettlementComponent extends NewRecordComponent<HoursSettlement> {
    userEditableService: UserEditableService = inject(UserEditableService);
    activitiesEditableService: ActivitiesEditableService = inject(ActivitiesEditableService);
    activitiesService: ActivitiesService = inject(ActivitiesService);

    usersEditable$ = this.userEditableService.getUsersEditable$().pipe(shareReplay(1));
    activitiesEditable$ = this.activitiesEditableService.getActivitiesEditable$().pipe(shareReplay(1));

    override addRecord(): void {
        super.addRecord(new HoursSettlement());
    }

    isActivityDescriptionDisabled(id: number): boolean {
        return !this.activitiesService.isActivitityDescriptionEnabled(id);
    }

    isFormInvalid(form: NgForm, record: HoursSettlement) {
        return form.invalid || record.activity_id == null || record.worker_id == null;
    }
}
