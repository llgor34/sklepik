import { Route } from '@angular/router';
import { RoleLabel } from './role.interface';

export interface TypedRoute extends Route {
    data?: {
        roles?: RoleLabel[];
    };
}

export type TypedRoutes = TypedRoute[];
