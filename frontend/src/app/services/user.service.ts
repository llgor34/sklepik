import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UsersResponse } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers$(): Observable<User[]> {
        return this.http.get<UsersResponse>('api/users').pipe(map((res) => res.users));
    }

    createUser$(name: string, surname: string, password: string): Observable<Response> {
        return this.http.post<Response>('api/users', { name, surname, password });
    }

    deleteUser$(userId: number): Observable<Response> {
        return this.http.delete<Response>(`api/users/${userId}`);
    }

    updateUserRoles$(userId: number, modifiedRoles: Role[]): Observable<Response> {
        return this.http.put<Response>('api/update-roles', { userId, modifiedRoles });
    }
}
