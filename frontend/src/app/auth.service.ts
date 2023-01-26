import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/login', { password }).pipe(
      catchError((res) => of(res.error)),
      tap((res) => {
        if (!res.user || !res.token) {
          return;
        }

        this.user = res.user;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.user = null;
    this.router.navigate(['/login']);
  }

  restoreSession() {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}