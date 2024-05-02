import express from 'express';
import { hasRoleMiddleware, verifyAccessToken } from '../general/auth-functions.mjs';
import {
    createUser,
    deleteUser,
    getLatestUser,
    getUserById,
    getUsers,
    updateUser,
    updateUserRoles,
} from '../db/users.mjs';
import { createLog } from '../db/logs.mjs';
import { sendErrorMessage } from '../general/messages.mjs';

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
        const { id } = await getLatestUser();

        res.send({ ok: true, message: 'SUCCESS', id });
        await createLog('USER_CREATED', `New user with id: ${id} has been created`, req.user.id);
    }
);

router.put(
    '/:id/update-roles',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { modifiedRoles } = req.body;
        const { id: userId } = req.params;

        const user = await getUserById(userId);
        await updateUserRoles(user.id, user.roles, modifiedRoles);

        res.send({ ok: true, message: 'SUCCESS' });
        await createLog('USER_ROLES_MODIFIED', `User roles with id: ${userId} has been modified`, req.user.id);
    }
);

router.put(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const fieldData = req.body;
        const userId = +req.params.id;

        await updateUser(userId, fieldData);
        res.send({ ok: true, message: 'SUCCESS' });

        await createLog('USER_DATA_MODIFIED', `User data with id: ${userId} has been modified`, req.user.id);
    }
);

router.delete(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { id } = req.params;

        try {
            await deleteUser(id);
        } catch (error) {
            return sendErrorMessage(res, 409, 'CANNOT_DELETE_USER');
        }

        res.send({ ok: true, message: 'SUCCESS' });

        await createLog('USER_DELETED', `Userwith id: ${id} has been deleted`, req.user.id);
    }
);

export default router;
