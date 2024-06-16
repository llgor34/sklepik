import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/interfaces/role.interface';
import { NewRecordService } from 'src/app/services/new-record.service';
import { providePanelServiceEndpoint } from 'src/app/constants/endpoint.constant';
import { PanelService } from 'src/app/services/panel.service';

@Component({
    selector: 'app-panel-users',
    templateUrl: './panel-users.component.html',
    styleUrls: ['./panel-users.component.css'],
    providers: [
        NewRecordService,
        { provide: PanelService, useClass: UserService },
        providePanelServiceEndpoint('api/users'),
    ],
})
export class PanelUsersComponent extends PanelComponent<User> implements OnInit {
    rolesService: RolesService = inject(RolesService);

    roles$: Observable<Role[]> = this.rolesService.getRoles$();
    users$: Observable<User[]> = this.panelService.getRecords$();
    userType!: TableBodyContext<(User & NumeratedIdx)[]>;

    onUserRolesChange(user: User, roles: Role[]) {
        (this.panelService as UserService)
            .updateUserRoles$(user.id!, roles)
            .subscribe(() => this.showUpdateSuccess(user.id!));
    }

    override getEmptyRecord(): User {
        return new User();
    }
}
