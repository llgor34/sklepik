import { query } from './db-functions.mjs';

export async function getUsedDiscount(workedCode) {
    const res = await query(
        'SELECT SUM(articles_sellment.price * articles_sellment.amount) AS usedDiscount FROM articles_sellment INNER JOIN  articles on articles.id = articles_sellment.article_id WHERE articles.code = ?;',
        [workedCode]
    );

    let usedDiscount = +res[0].usedDiscount;
    if (isNaN(usedDiscount)) {
        usedDiscount = 0;
    }

    return usedDiscount;
}
