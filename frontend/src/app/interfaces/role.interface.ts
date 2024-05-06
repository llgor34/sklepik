import { Response } from './response.interface';

export interface Role {
    id: number;
    label: RoleLabel;
}

export type RoleLabel = 'superAdmin' | 'admin' | 'worker';

export interface RoleResponse extends Response {
    roles: Role[];
}
