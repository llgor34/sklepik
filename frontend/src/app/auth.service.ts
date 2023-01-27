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
  token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/login', { password }).pipe(
      tap((res) => {
        if (!res.user || !res.token) {
          return;
        }

        this.user = res.user;
        this.token = res.token;
        this.saveAuthDataInLocalStorage();
      })
    );
  }

  logout(): void {
    this.deleteAuthDataFromLocalStorage();

    this.user = null;
    this.router.navigate(['/login']);
  }

  restoreSession() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.user = JSON.parse(user);
      this.token = token;
    }
  }

  saveAuthDataInLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user!));
    localStorage.setItem('token', this.token!);
  }

  deleteAuthDataFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getRoles() {
    return this.user!.role;
  }
}
