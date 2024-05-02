import { Component } from '@angular/core';
import { NewRecordComponent } from 'src/app/component/new-record/new-record.component';
import { User } from 'src/app/interfaces/user.interface';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css', '../../panel-default/panel-new-record.component.css'],
})
export class NewUserComponent extends NewRecordComponent<User> {
    override addRecord() {
        super.addRecord(new User());
    }
}
