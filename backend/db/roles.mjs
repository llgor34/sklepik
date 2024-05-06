import { query } from './db-functions.mjs';

export async function getRoles() {
    const response = await query(`
    SELECT  
        id, 
        name AS label 
    FROM 
        roles; 
    `);

    return response;
}
