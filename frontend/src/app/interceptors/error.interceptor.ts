import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError(({ error }) => {
        switch (error.message) {
          case 'AUTH_TOKEN_NOT_PROVIDED':
          case 'AUTH_TOKEN_EXPIRED':
            this.authService.logout();
            break;

          case 'DISCOUNT_TOO_HIGH':
            this.toastService.showError(
              'Kwota zniżki nie może przekraczać łącznej kwoty wypracowanych zniżek'
            );
            break;
          case 'NEGATIVE_PRICE':
            this.toastService.showError('Kwota zamówienia nie może być ujemna');
            break;

          default:
            this.toastService.showError('Wystąpił nieoczekiwany błąd');
        }

        return throwError(() => error);
      })
    );
  }
}
