import { Response } from './response.interface';

export interface OwedDiscountResponse extends Response {
    owedDiscount: number;
}
