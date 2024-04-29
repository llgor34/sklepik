import express from 'express';

import { generateAccessToken, signJWTCookie } from '../general/auth-functions.mjs';
import { getUserByPassword } from '../db/users.mjs';
import { sendErrorMessage } from '../general/messages.mjs';

const router = express.Router();

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
