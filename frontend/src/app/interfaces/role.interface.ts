export interface Role {
    id: number;
    label: RoleLabel;
}

export type RoleLabel = 'superAdmin' | 'admin' | 'worker';
