import { User } from './user.interface';

export interface LoginResponse extends Response {
  user?: User;
}
