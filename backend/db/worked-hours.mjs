import { query } from '../general/db-functions.mjs';
import { getUserByPassword } from './users.mjs';

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

export async function getUsedDiscountByWorkerCode(workerCode) {
    const res = await query(
        'SELECT SUM(articles_sellment.price * articles_sellment.amount) AS usedDiscount FROM articles_sellment INNER JOIN  articles on articles.id = articles_sellment.article_id WHERE articles.code = ?;',
        [workerCode]
    );

    let usedDiscount = +res[0].usedDiscount;
    if (isNaN(usedDiscount)) {
        usedDiscount = 0;
    }

    return usedDiscount;
}

export async function getUsedDiscountByWorkerId(id) {
    const workerCode = (await query('SELECT password FROM workers WHERE id = ?', [id]))[0].password;
    const usedDiscount = await getUsedDiscountByWorkerCode(workerCode);

    return usedDiscount;
}
