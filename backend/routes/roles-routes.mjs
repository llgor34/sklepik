import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getRoles } from '../db/roles.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const roles = await getRoles();
    res.send({ ok: true, message: 'SUCCESS', roles });
});

export default router;
