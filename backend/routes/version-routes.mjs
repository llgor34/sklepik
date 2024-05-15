import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getVersion } from '../db/version.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const version = await getVersion();
    sendSuccessMessage(res, version);
});

export default router;
