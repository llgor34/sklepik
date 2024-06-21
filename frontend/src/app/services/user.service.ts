import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';
import { Response } from '../interfaces/response.interface';
import { PanelService } from './panel.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends PanelService<User> {
    updateUserRoles$ = (userId: number, modifiedRoles: Role[]): Observable<Response> => {
        return this.http.put<Response>(`${this.endpoint}/${userId}/update-roles`, { modifiedRoles });
    };
}
