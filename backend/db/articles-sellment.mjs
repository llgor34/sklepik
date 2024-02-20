import { query } from './db-functions.mjs';

export async function getLatestArticlesSellmentId() {
    const result = await query('SELECT id FROM articles_sellment ORDER BY id DESC LIMIT 1');
    const record = result[0];
    return record.id;
}
