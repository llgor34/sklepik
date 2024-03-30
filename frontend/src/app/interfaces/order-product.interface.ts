import { OrderProductOption } from './order-product-option.interface';

export interface OrderProduct {
    articles_sellment_id: number;
    code: string;
    short_name: string;
    options: OrderProductOption[];
}
