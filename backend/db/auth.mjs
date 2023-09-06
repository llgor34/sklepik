import { query } from './db-functions.mjs';
import { verifyPassword } from '../general/auth-functions.mjs';

export async function getUserByPassword(password) {
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
	GROUP BY 
		workers.id;`
	);

	if (users.length === 0) {
		return null;
	}

	for (const user of users) {
		console.log(user, password);
		if (!user.password) continue;
		if (verifyPassword(password, user.password)) {
			console.log('USER MATCH - ', user);
			user.roles = user.roles?.split(',') ?? [];
			return user;
		}
	}

	return null;
}
