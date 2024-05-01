import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-panel-users',
    templateUrl: './panel-users.component.html',
    styleUrls: ['./panel-users.component.css'],
})
export class PanelUsersComponent {
    users$: Observable<User[]> = this.userService.getUsers$();
    userType!: TableBodyContext<User[]>;

    constructor(private userService: UserService) {}
}
