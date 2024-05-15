import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: User | null = null;

    constructor(private http: HttpClient, private router: Router) {}

    login(password: string): Observable<User | null> {
        return this.http.post<Response<User | null>>('api/login', { password }).pipe(
            map((res) => res.data),
            tap((user) => {
                if (!user) {
                    return;
                }
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user!));
            })
        );
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    restoreSession() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }
    }

    getRoles() {
        return this.user?.roles ?? [];
    }

    getUsername() {
        if (!this.user) {
            return '';
        }
        return `${this.user.name} ${this.user.surname}`;
    }

    getUsernameInitials() {
        if (!this.user) {
            return '';
        }
        return `${this.user.name![0].toUpperCase()}${this.user.surname![0].toUpperCase()}`;
    }
}
