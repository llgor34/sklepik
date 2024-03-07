import { Response } from './response.interface';

export interface ErrorResponse extends Response {
    message:
        | 'AUTH_TOKEN_NOT_PROVIDED'
        | 'AUTH_TOKEN_EXPIRED'
        | 'PASSWORD_NOT_PROVIDED'
        | 'PRODUCTS_NOT_PROVIDED'
        | 'USER_NOT_FOUND'
        | 'INSUFFICIENT_PERMISSIONS'
        | 'RAPORT_NOT_GENERATED'
        | 'DISCOUNT_TOO_HIGH'
        | 'NEGATIVE_PRICE';
}
