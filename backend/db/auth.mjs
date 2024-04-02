import { query } from './db-functions.mjs';

export async function getUserByPassword(password) {
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
        [password]
    );

    return res[0];
}
