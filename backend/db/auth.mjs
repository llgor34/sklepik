import { query } from './db-functions.mjs';

export async function getUserByUsername(username) {
	const users = await query(
		`
	SELECT
		workers.id, workers.name, workers.surname, workers.password, GROUP_CONCAT(roles.name) AS roles
	FROM
		workers
	JOIN
		permissions ON workers.id = permissions.worker_id
	JOIN 
		roles ON permissions.role_id = roles.id
	WHERE
		workers.name = ?
	GROUP BY 
		workers.id;`,
		[username]
	);

	const user = users[0];
	if (!user) {
		return null;
	}
	user.roles = user.roles.split(',');
	return user;
}
