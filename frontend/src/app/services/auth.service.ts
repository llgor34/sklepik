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
                if (!user) return;

                this.setUser(user);
                this.addUserToLocalStorage();
            })
        );
    }

    logout() {
        this.resetUser();
        this.removeUserFromLocalStorage();
        this.navigateToLoginPage();
    }

    restoreSession() {
        const user = this.getUserFromLocalStorage();
        this.setUser(user);
    }

    setUser(user: User | null) {
        this.user = user;
    }

    resetUser(): void {
        this.user = null;
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

    private removeUserFromLocalStorage(): void {
        localStorage.removeItem('user');
    }

    private addUserToLocalStorage(): void {
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    private getUserFromLocalStorage(): User | null {
        const userString = localStorage.getItem('user');

        if (userString) {
            return JSON.parse(userString);
        }
        return null;
    }

    private navigateToLoginPage(): void {
        this.router.navigate(['/login']);
    }
}
