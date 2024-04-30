import { Response } from './response.interface';
import { Role } from './role.interface';

export interface User {
    id: number;
    name: string;
    surname: string;
    roles: Role[];
}

export interface UsersResponse extends Response {
    users: User[];
}
