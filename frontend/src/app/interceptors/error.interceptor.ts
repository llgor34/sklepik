import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private toastService: ToastService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError(({ error }) => {
                switch (error.message) {
                    case 'AUTH_TOKEN_NOT_PROVIDED':
                    case 'AUTH_TOKEN_EXPIRED':
                        this.authService.logout();
                        break;

                    case 'PASSWORD_NOT_PROVIDED':
                        this.toastService.showError('Nie podano hasła');
                        break;

                    case 'PRODUCTS_NOT_PROVIDED':
                        this.toastService.showError('Nie przekazano żadnych produktów');
                        break;

                    case 'INSUFFICIENT_PERMISSIONS':
                        this.toastService.showError('Nie posiadasz wystarczających uprawnień');
                        break;

                    case 'RAPORT_NOT_GENERATED':
                        this.toastService.showError('Nie udało się wygenerować raportu');
                        break;

                    case 'DISCOUNT_TOO_HIGH':
                        this.toastService.showError(
                            'Kwota zniżki nie może przekraczać łącznej kwoty wypracowanych zniżek'
                        );
                        break;

                    case 'NEGATIVE_PRICE':
                        this.toastService.showError('Kwota nie może być ujemna');
                        break;

                    case 'USER_NOT_FOUND':
                        this.toastService.showError('Użytkownik o podanym identyfikatorze nie istnieje!');
                        break;

                    case 'PRICE_NOT_NUMBER':
                        this.toastService.showError('Cena musi być liczbą');
                        break;

                    case 'INVALID_DATA_FORMAT':
                        this.toastService.showError('Niepoprawny format danych');
                        break;

                    case 'DELETE_CONSTRAINT_CONFLICT_PRODUCT':
                        this.toastService.showError(
                            'Nie można usunąć produktu, ponieważ został sprzedany / zawarty w raporcie!'
                        );
                        break;

                    default:
                        this.toastService.showError('Wystąpił nieoczekiwany błąd');
                }

                return throwError(() => error);
            })
        );
    }
}
