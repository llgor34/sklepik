import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role, RoleResponse } from '../interfaces/role.interface';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor(private http: HttpClient) {}

    getRoles$(): Observable<Role[]> {
        return this.http.get<RoleResponse>('api/roles').pipe(map((res) => res.roles));
    }
}
