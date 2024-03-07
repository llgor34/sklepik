import { query } from './db-functions.mjs';
import { getUserByPassword } from './auth.mjs';

export async function getOwedDiscount(workerCode) {
    const { id: workerId } = await getUserByPassword(workerCode.toString());
    const res = await query('SELECT SUM(amount) as workedHours FROM worked_hours WHERE worker_id = ?;', [workerId]);

    const workedHours = +res[0].workedHours;
    const discountRate = +process.env.DISCOUNT_RATE;

    let owedDiscount = workedHours * discountRate;
    if (isNaN(owedDiscount)) {
        owedDiscount = 0;
    }

    return owedDiscount;
}
