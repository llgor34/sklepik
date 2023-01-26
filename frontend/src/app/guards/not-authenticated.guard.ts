import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch() {
    if (this.authService.user) {
      return this.router.createUrlTree(['/main']);
    }

    return true;
  }
}
