import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { NumeratedIdx } from 'src/app/interfaces/numerated.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
    selector: 'app-panel-users',
    templateUrl: './panel-users.component.html',
    styleUrls: ['./panel-users.component.css'],
})
export class PanelUsersComponent extends PanelComponent<User> implements OnInit {
    userService: UserService = inject(UserService);
    @ViewChild(NewUserComponent, { static: false }) newUserComponent!: NewUserComponent;

    users$: Observable<User[]> = this.userService.getUsers$();
    userType!: TableBodyContext<(User & NumeratedIdx)[]>;

    ngOnInit(): void {
        super.initializeComponent(
            this.userService.getUsers$(),
            this.userService.updateUserData$,
            this.userService.deleteUser$,
            this.userService.createUser$
        );
    }

    onAddNewEmptyRecord() {
        this.newUserComponent.addRecord();
    }
}
