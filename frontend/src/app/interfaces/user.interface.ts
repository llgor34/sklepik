import { Response } from './response.interface';
import { Role } from './role.interface';

export class User {
    constructor(
        public id: number | null = null,
        public name: string | null = null,
        public surname: string | null = null,
        public password: string | null = null,
        public roles: Role[] = []
    ) {}
}

export interface UsersResponse extends Response {
    users: User[];
}
