import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
import { EditableItem } from '../interfaces/editable-item.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserEditableService {
    private userService = inject(UserService);

    getUsersEditable$ = (): Observable<EditableItem[]> => {
        return this.userService.getUsers$().pipe(map(this.mapUsersToEditable));
    };

    private mapUsersToEditable = (users: User[]): EditableItem[] => {
        return users.map<EditableItem>((user) => ({ id: user.id!, label: `${user.name} ${user.surname}` }));
    };
}
