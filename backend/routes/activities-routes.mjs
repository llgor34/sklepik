import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getActivities } from '../db/activities.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const activities = await getActivities();
        res.send({ ok: true, message: 'SUCCESS', activities });
    }
);

export default router;
