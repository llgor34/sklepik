import { query } from './db-functions.mjs';

export async function createOrder(products, paymentMethod, workerId, clientId = null) {
	const paymentMethodId = await getPaymentMethodIdByName(paymentMethod);
	await query(`INSERT INTO orders VALUES(null, ?, ?, ?, null)`, [workerId, clientId, paymentMethodId]);

	const orderId = await getLatestOrderId();
	for (const product of products) {
		await query(`INSERT INTO articles_sellment VALUES(null, ?, ?, ?, ?)`, [product.id, orderId, product.price, product.amount]);
	}
}

async function getPaymentMethodIdByName(name) {
	const res = await query(`SELECT id FROM payment_methods WHERE name = ?`, [name]);

	const record = res[0];
	if (!record) {
		return null;
	}
	return record.id;
}

async function getLatestOrderId() {
	const result = await query('SELECT id FROM orders ORDER BY id DESC LIMIT 1');
	const record = result[0];
	return record.id;
}
