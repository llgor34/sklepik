import { OrderProductOption } from './order-product-option.interface';

export interface OrderProduct {
    articles_sellment_id: number;
    short_name: string;
    options: OrderProductOption[];
}
