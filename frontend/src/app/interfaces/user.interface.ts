import { Role } from './role.interface';

export interface User {
  name: string;
  surname: string;
  role: Role[];
}
