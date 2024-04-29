import express from 'express';
import { hasRoleMiddleware, verifyAccessToken } from '../general/auth-functions.mjs';
import { createUser, deleteUser, getUserById, getUsers, updateUserRoles } from '../db/users.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const users = await getUsers();
        return res.send({ ok: true, message: 'SUCCESS', users });
    }
);

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { name, surname, password } = req.body;
        await createUser(name, surname, password);
        return res.send({ ok: true, message: 'SUCCESS' });
    }
);

router.delete(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { password } = req.body;
        await deleteUser(password);
        return res.send({ ok: true, message: 'SUCCESS' });
    }
);

router.put(
    '/update-roles',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { workerId, modifiedRoles } = req.body;
        const user = await getUserById(workerId);

        await updateUserRoles(user.id, user.roles, modifiedRoles);

        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
