import { query } from '../../db-functions.mjs';

export async function generateRaport(workerId) {
	const raports = await query('SELECT * FROM sellment_close ORDER BY id DESC LIMIT 1');
	const previousRaport = raports[0];

	const yearNumber = process.env.YEAR_NUMBER;
	let startingOrderId = 1;
	let raportNumber = 1;

	if (previousRaport) {
		startingOrderId = previousRaport.ending_order_id + 1;
		raportNumber = previousRaport.number + 1;
	}

	if (previousRaport?.year_number != yearNumber) {
		raportNumber = 1;
	}

	const orders = await query('SELECT id FROM orders ORDER BY id DESC LIMIT 1');
	const order = orders[0];

	if (!order || order.id == previousRaport?.ending_order_id) {
		return false;
	}

	const endingOrderId = order.id;
	await query('INSERT INTO sellment_close VALUES(null, ?, ?, null, ?, ?, ?)', [raportNumber, yearNumber, workerId, startingOrderId, endingOrderId]);

	const res = await query('SELECT * FROM sellment_close ORDER BY id DESC LIMIT 1');
	return res[0];
}
