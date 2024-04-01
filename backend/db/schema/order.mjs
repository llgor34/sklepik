import { getOrderNumber } from '../order.mjs';
export class Order {
    order_id;
    order_number;
    order_status;
    products;
    lesson;

    constructor(order_id, order_status, lesson, products) {
        this.order_id = order_id;
        this.order_number = getOrderNumber(order_id);
        this.order_status = order_status;
        this.products = products;
        this.lesson = lesson;
    }
}
