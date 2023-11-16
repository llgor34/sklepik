import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Role } from '../interfaces/role.interface';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfUserHasRequiredRoles(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfUserHasRequiredRoles(route);
  }

  checkIfUserHasRequiredRoles(route: ActivatedRouteSnapshot) {
    const requiredRoles: Role[] = route.data['roles'];
    const userRoles = this.authService.getRoles();

    if (requiredRoles.some((role) => userRoles.includes(role))) {
      return true;
    }

    this.toastService.showError('Nie posiadasz wystarczających uprawnień!');
    return this.router.navigate(['..']);
  }
}
