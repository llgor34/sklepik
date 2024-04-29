import { query } from './db-functions.mjs';

export async function createUser(name, surname, password) {
    await query(`INSERT INTO workers(id, name, surname, password) VALUES(null, ?, ?, ?)`, [name, surname, password]);
    await query(`INSERT INTO articles(id, price, code, type, short_name, full_name) VALUES(null, ?, ?, ?, ?, ?)`, [
        -0.5,
        password,
        'discount',
        `Zniżka pracownicza - ${surname}`,
        `Zniżka pracownicza - ${surname} ${name}`,
    ]);
}

export async function deleteUser(password) {
    await query(`DELETE FROM workers WHERE password = ?`, [password]);
    try {
        await query(`DELETE FROM articles WHERE code = ?`, [password]);
    } catch (error) {
        console.log('Discount had been used - cannot delete due to dependencies with raports');
    }
}

export async function updateUserRoles(userId, currentRoles, modifiedRoles) {
    const rolesToAdd = [];
    const rolesToRemove = [];

    for (const currentRole of currentRoles) {
        if (!modifiedRoles.some((modifiedRole) => modifiedRole.id === currentRole.id)) {
            rolesToRemove.push(currentRole);
        }
    }
    for (const modifiedRole of modifiedRoles) {
        if (!currentRoles.some((currentRole) => currentRole.id === modifiedRole.id)) {
            rolesToAdd.push(modifiedRole);
        }
    }

    await Promise.all([
        ...rolesToAdd.map((role) =>
            query(`INSERT INTO permissions(id, worker_id, role_id) VALUES(null, ?, ?);`, [userId, role.id])
        ),
        ...rolesToRemove.map((role) =>
            query(`DELETE FROM permissions WHERE worker_id = ? AND role_id = ?;`, [userId, role.id])
        ),
    ]);
}

export async function getUsers() {
    // id | name | surname | password
    const usersRAW = await query(`SELECT * FROM workers;`);

    // worker_id | role_id | role_label
    const permissions = await query(
        `
        SELECT 
            permissions.worker_id, 
            roles.id AS role_id, 
            roles.name AS role_label 
        FROM 
            permissions 
        INNER JOIN roles ON permissions.role_id = roles.id;
        `
    );

    const users = [];
    for (const user of usersRAW) {
        const userPermissions = getUserPermissions(permissions, user.id);
        const userRoles = getRolesFromPermissions(userPermissions);
        users.push({ ...user, roles: userRoles });
    }

    return users;
}

export async function getUserByPassword(password) {
    const users = await getUsers();
    return users.filter((user) => user.password === password)[0];
}

export async function getUserById(id) {
    const users = await getUsers();
    return users.filter((user) => user.id === id)[0];
}

function getUserPermissions(permissions, userId) {
    return permissions.filter((permission) => permission.worker_id === userId);
}

function getRolesFromPermissions(permissions) {
    return permissions.map((permission) => ({ id: permission.role_id, label: permission.role_label }));
}
