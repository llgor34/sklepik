import { query } from './db-functions.mjs';

export async function getActivities() {
	const activities = await query('SELECT * FROM activities');
	return activities;
}

export async function createActivity(activityId, adminId, workerId, amount, date, description = null) {
	await query(`INSERT INTO worked_hours VALUES(null, ?, ?, ?, ?, ?, ?, null)`, [activityId, adminId, workerId, amount, description, date]);
}