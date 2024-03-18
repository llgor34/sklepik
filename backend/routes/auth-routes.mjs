import express from 'express';

import { hashPassword, generateAccessToken, signJWTCookie } from '../general/auth-functions.mjs';
import { getUserByPassword } from '../db/auth.mjs';
import { sendErrorMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/generate-password/:password', async (req, res) => {
    const { password } = req.params;
    const hash = hashPassword(password);
    return res.send(hash);
});

router.post('/login', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return sendErrorMessage(res, 422, 'PASSWORD_NOT_PROVIDED');
    }

    const user = await getUserByPassword(password);
    if (!user) {
        return sendErrorMessage(res, 401, 'USER_NOT_FOUND');
    }

    const token = generateAccessToken(user);
    signJWTCookie(res, token);

    const { name, surname, roles } = user;
    return res.send({
        ok: true,
        message: 'USER_LOGGED_IN',
        user: { name, surname, roles },
    });
});

export default router;
