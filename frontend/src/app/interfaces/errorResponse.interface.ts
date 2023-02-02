import { Response } from './response.interface';

export interface ErrorResponse extends Response {
  message:
    | 'PASSWORD_NOT_PROVIDED'
    | 'USERNAME_NOT_PROVIDED'
    | 'USER_NOT_FOUND'
    | 'PASSWORD_INVALID'
    | 'PRODUCTS_NOT_PROVIDED'
    | 'AUTH_TOKEN_NOT_PROVIDED'
    | 'AUTH_TOKEN_EXPIRED';
}
