import { query } from './db-functions.mjs';

export async function getHoursSettlement() {
	const result = await query(
		`SELECT worked_hours.id, worked_hours.work_date, workers.name, workers.surname, activities.name as activity_name, worked_hours.description, worked_hours.amount FROM worked_hours
	INNER JOIN workers ON workers.id = worked_hours.worker_id
	INNER JOIN activities ON activities.id = worked_hours.activity_id
	ORDER BY worked_hours.work_date DESC;`,
		[]
	);
	return result;
}

export async function deleteHoursSettlement(id) {
	await query('DELETE FROM worked_hours WHERE id = ?', [id]);
}
