import { query } from './db-functions.mjs';

export async function getActivities() {
    const activities = await query('SELECT * FROM activities');
    return activities;
}
