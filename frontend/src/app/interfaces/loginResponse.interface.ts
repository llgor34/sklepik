import { User } from './user.interface';

export interface LoginResponse {
  ok: boolean;
  token: string;
  user: User;
}
