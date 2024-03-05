import { getOrderNumber } from '../order.mjs';
export class Order {
    order_id;
    order_number;
    order_status;
    products;

    constructor(order_id, order_status, products) {
        this.order_id = order_id;
        this.order_number = getOrderNumber(order_id);
        this.order_status = order_status;
        this.products = products;
    }
}
