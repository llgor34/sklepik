import { query } from './db-functions.mjs';

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
