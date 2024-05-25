import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getRoles } from '../db/roles.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const roles = await getRoles();
    sendSuccessMessage(res, roles);
});

export default router;
