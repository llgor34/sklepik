import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NewRecordComponent } from 'src/app/component/new-record/new-record.component';
import { Role } from 'src/app/interfaces/role.interface';
import { User } from 'src/app/interfaces/user.interface';
import { RolesService } from 'src/app/services/roles.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css', '../../panel-default/panel-new-record.component.css'],
})
export class NewUserComponent extends NewRecordComponent<User> {
    rolesService: RolesService = inject(RolesService);

    roles$: Observable<Role[]> = this.rolesService.getRoles$();
}
