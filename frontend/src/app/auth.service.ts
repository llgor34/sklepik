import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('api/login', { username, password })
      .pipe(
        tap((res) => {
          if (!res.user) {
            return;
          }

          this.user = res.user;
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
    return this.user!.role;
  }
}
