import { OrderProduct } from './order-product.interface';

export interface Order {
  order_id: number;
  order_status: OrderStatus;
  products: OrderProduct[];
}

export type OrderStatus = 'nd' | 'new' | 'done' | 'closed';
