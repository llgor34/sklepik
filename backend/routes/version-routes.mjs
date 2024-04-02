import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getVersion } from '../db/version.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const version = await getVersion();
    res.send({ ok: true, message: 'SUCCESS', version });
});

export default router;
