import { query } from './db-functions.mjs';
import { getUserByPassword } from './auth.mjs';

export async function getOwedDiscountByWorkerCode(workerCode, _workerId = null) {
    const workerId = _workerId ? _workerId : (await getUserByPassword(workerCode.toString())).id;
    const res = await query('SELECT SUM(amount) as workedHours FROM worked_hours WHERE worker_id = ?;', [workerId]);

    const workedHours = +res[0].workedHours;
    const discountRate = +process.env.DISCOUNT_RATE;

    let owedDiscount = workedHours * discountRate;
    if (isNaN(owedDiscount)) {
        owedDiscount = 0;
    }

    return owedDiscount;
}

export async function getOwedDiscountByWorkerId(id) {
    const owedDiscount = await getOwedDiscountByWorkerCode(null, id);
    return owedDiscount;
}
