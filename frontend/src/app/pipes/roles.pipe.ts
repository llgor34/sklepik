import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../interfaces/role.interface';

@Pipe({
  name: 'roles',
})
export class RolesPipe implements PipeTransform {
  transform(roles: Role[]): string {
    return roles.join(', ');
  }
}
