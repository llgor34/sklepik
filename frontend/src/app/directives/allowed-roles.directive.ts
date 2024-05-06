import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role, RoleLabel } from '../interfaces/role.interface';

@Directive({
    selector: '[allowedRoles]',
})
export class AllowedRolesDirective implements OnInit {
    @Input() allowedRoles!: RoleLabel[];
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
        return this.allowedRoles.some((allowedRole) =>
            this.userRoles.some((userRole) => userRole.label === allowedRole)
        );
    }
}
