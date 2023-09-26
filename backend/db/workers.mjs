import { query } from './db-functions.mjs';

export async function getWorkers() {
    const workers = await query('SELECT id, name, surname FROM workers');
    return workers;
}
