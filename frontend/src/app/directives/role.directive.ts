import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { Role } from '../interfaces/role.interface';

@Directive({
  selector: '[allowedRoles]',
})
export class RoleDirective implements OnInit {
  @Input() allowedRoles!: Role[];

  userRoles: Role[];

  constructor(
    authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.userRoles = authService.getRoles();
  }

  ngOnInit(): void {
    console.log(this.userRoles);
    if (this.hasPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }

  hasPermission() {
    return this.allowedRoles.some((allowedRole) =>
      this.userRoles.includes(allowedRole)
    );
  }
}
