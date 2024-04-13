import { getOrders } from '../db/order.mjs';
import { ordersNamespace } from '../index.mjs';

export async function onOrderStatusReady(order_number) {
    ordersNamespace.emit('orderReady', order_number);
}

export async function onOrdersChange() {
    const orders = await getOrders();
    ordersNamespace.emit('ordersChange', orders);
}

export async function emitOrdersFor(socket) {
    const orders = await getOrders();
    socket.emit('ordersChange', orders);
}
