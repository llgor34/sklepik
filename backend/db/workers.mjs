import { query } from '../general/db-functions.mjs';

export async function getWorkers() {
    const workers = await query('SELECT id, name, surname FROM workers');
    return workers;
}

export async function getWorkedHoursByWorkerId(id) {
    const res = (
        await query(
            `
    SELECT 
        SUM(worked_hours.amount) as hours_amount
    FROM 
        worked_hours
    WHERE 
        worked_hours.worker_id = ?
    GROUP BY 
        worked_hours.worker_id;`,
            [id]
        )
    )[0];
    return res ? res.hours_amount : 0;
}
