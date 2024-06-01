import { RoleLabel } from './role.interface';

export interface Card {
    imageUrl: string;
    title: string;
    description: string;
    url: string;
    requiredRoles: RoleLabel[];
}
