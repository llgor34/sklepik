import { config } from './config.mjs';
import { createConnection } from 'mysql2/promise';

export async function query(sql, params) {
	const connection = await createConnection(config);
	const [results] = await connection.execute(sql, params);
	connection.end();

	return results;
}
