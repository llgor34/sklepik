import { query } from './db-functions.mjs';
import { hashPassword } from '../general/auth-functions.mjs';

export async function getUserByPassword(password) {
	const hash = hashPassword(password);
	const res = await query(
		`
	SELECT
		workers.id, workers.name, workers.surname, workers.password, GROUP_CONCAT(roles.name) AS roles
	FROM
		workers
	LEFT JOIN
		permissions ON workers.id = permissions.worker_id
	LEFT JOIN 
		roles ON permissions.role_id = roles.id
	WHERE
		workers.password = ?
	GROUP BY 
		workers.id;`,
		[hash]
	);

	return res[0];
}
