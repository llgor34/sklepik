import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../interfaces/role.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor(private http: HttpClient) {}

    getRoles$(): Observable<Role[]> {
        return this.http.get<Response<Role[]>>('api/roles').pipe(map((res) => res.data));
    }
}
