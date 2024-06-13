import { dateToRaportPreviewDataFormat } from '../../../general/date.mjs';
import { query } from '../../../general/db-functions.mjs';

export async function getAllRaportsPreview() {
    const result = await query(`SELECT id, date FROM sellment_close ORDER BY date DESC;`);
    return result.map((result) => ({ ...result, date: dateToRaportPreviewDataFormat(result.date) }));
}
