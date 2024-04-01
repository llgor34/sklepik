import { Lesson } from './lesson.interface';
import { OrderProduct } from './order-product.interface';

export interface Order {
    order_id: number;
    order_number: number;
    order_status: OrderStatus;
    products: OrderProduct[];
    lesson: Lesson | null;
}

export type OrderStatus = 'nd' | 'new' | 'done' | 'closed';
