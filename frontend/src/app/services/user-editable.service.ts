import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EditableItem } from '../interfaces/editable-item.interface';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class UserEditableService {
    private http = inject(HttpClient);

    getUsersEditable$ = (): Observable<EditableItem[]> => {
        return this.http.get<Response<User[]>>('api/users').pipe(
            map((res) => res.data),
            map(this.mapUsersToEditable)
        );
    };

    private mapUsersToEditable = (users: User[]): EditableItem[] => {
        return users.map<EditableItem>((user) => ({ id: user.id!, label: `${user.name} ${user.surname}` }));
    };
}
