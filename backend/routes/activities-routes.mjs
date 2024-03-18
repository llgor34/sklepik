import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getActivities, createActivity } from '../db/activities.mjs';

const router = express.Router();

router.get(
    '/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const activities = await getActivities();
        res.send({ ok: true, message: 'SUCCESS', activities });
    }
);

router.post(
    '/create',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { workerId, activityId, description, date, amount } = req.body;
        await createActivity(activityId, req.user.id, workerId, amount, date, description);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
