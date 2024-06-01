import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role, RoleLabel } from '../interfaces/role.interface';

@Directive({
    selector: '[appRequiredRoles]',
})
export class RequiredRolesDirective implements OnInit {
    @Input('appRequiredRoles') requiredRoles!: RoleLabel[];
    userRoles: Role[] = this.authService.getRoles();

    constructor(
        private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    ngOnInit(): void {
        if (this.hasPermission()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        this.viewContainer.clear();
    }

    hasPermission() {
        if (this.requiredRoles.length === 0) {
            return true;
        }

        return this.requiredRoles.some((requiredRole) =>
            this.userRoles.some((userRole) => userRole.label === requiredRole)
        );
    }
}
