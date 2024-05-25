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
