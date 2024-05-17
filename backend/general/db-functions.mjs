import { config } from './config.mjs';
import { createConnection } from 'mysql2/promise';

export async function query(sql, params) {
    const connection = await createConnection(config);
    const [results] = await connection.execute(sql, params);
    connection.end();

    return results;
}

export async function updateFieldQuery(tableName, elementId, fieldData) {
    let queryStrRaw = `UPDATE ${tableName} SET `;
    const params = [];

    for (const key in fieldData) {
        if (fieldData[key] === undefined) {
            continue;
        }

        queryStrRaw += `${key} = ?, `;
        params.push(fieldData[key]);
    }

    let preparedQuery = removeTrailingCommaFromQuery(queryStrRaw);
    preparedQuery += ' WHERE id = ?';
    params.push(elementId);

    return await query(preparedQuery, params);
}

function removeTrailingCommaFromQuery(queryStr) {
    let newQuery = queryStr.split(',');
    if (newQuery.length > 1) {
        newQuery.length = newQuery.length - 1;
    }
    newQuery = newQuery.join(',');
    return newQuery;
}
