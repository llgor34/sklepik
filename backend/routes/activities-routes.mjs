import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getActivities } from '../db/activities.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const activities = await getActivities();
        return sendSuccessMessage(res, activities);
    }
);

export default router;
