import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError(({ error }) => {
        switch (error.message) {
          case 'AUTH_TOKEN_NOT_PROVIDED':
          case 'AUTH_TOKEN_EXPIRED':
            this.authService.logout();
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
