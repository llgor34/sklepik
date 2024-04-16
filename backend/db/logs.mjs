import { query } from './db-functions.mjs';

export async function createLog(type, description, worker_id, client_id = null) {
    await query('INSERT INTO logs VALUES(null, ?, ?, ?, ?, null)', [type, description, worker_id, client_id]);
}
