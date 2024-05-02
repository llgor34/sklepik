import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UsersResponse } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { Response } from '../interfaces/response.interface';
import { IdResponse } from '../interfaces/id-response.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers$ = (): Observable<User[]> => {
        return this.http.get<UsersResponse>('api/users').pipe(map((res) => res.users));
    };

    createUser$ = (user: User): Observable<number> => {
        return this.http.post<IdResponse>('api/users', user).pipe(map((res) => res.id));
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
}
