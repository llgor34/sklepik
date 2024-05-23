import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { Response } from '../interfaces/response.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    createUser$ = (user: User): Observable<number> => {
        return this.http.post<Response<number>>('api/users', user).pipe(map((res) => res.data));
    };

    deleteUser$ = (userId: number): Observable<Response> => {
        return this.http.delete<Response>(`api/users/${userId}`);
    };

    updateUserRoles$ = (userId: number, modifiedRoles: Role[]): Observable<Response> => {
        return this.http.put<Response>(`api/users/${userId}/update-roles`, { modifiedRoles });
    };

    updateUserData$ = (userId: number, fieldData: Partial<User>): Observable<Response> => {
        return this.http.put<Response>(`api/users/${userId}`, fieldData);
    };

    getUsers$ = (): Observable<User[]> => {
        return this.http.get<Response<User[]>>('api/users').pipe(map((res) => res.data));
    };

    getUsersEditable$ = (): Observable<EditableItem[]> => {
        return this.getUsers$().pipe(map(this.mapUsersToEditable));
    };

    getUserEditableById$(usersEditable$: Observable<EditableItem[]>, id: number): Observable<EditableItem> {
        return usersEditable$.pipe(map((users) => users.filter((user) => user.id === id)[0]));
    }

    private mapUsersToEditable = (users: User[]): EditableItem[] => {
        return users.map<EditableItem>((user) => ({ id: user.id!, label: `${user.name} ${user.surname}` }));
    };
}
