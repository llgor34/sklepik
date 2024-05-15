import { query } from '../general/db-functions.mjs';
import { createLog } from './logs.mjs';

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

export async function createHoursSettlement(activityId, adminId, workerId, amount, date, description = null) {
    await query(`INSERT INTO worked_hours VALUES(null, ?, ?, ?, ?, ?, ?, null)`, [
        activityId,
        adminId,
        workerId,
        amount,
        description,
        date,
    ]);

    await createLog('ACTIVITY_CREATED', `Hours with id ${activityId} and amount ${amount} has been by admin`, adminId);
}
