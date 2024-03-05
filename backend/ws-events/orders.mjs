import { getOrders } from '../db/order.mjs';
import { io } from '../index.mjs';

export async function onOrdersChange() {
	const orders = await getOrders();
	io.emit('orderChange', orders);
}
