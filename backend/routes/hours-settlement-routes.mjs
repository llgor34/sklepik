import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { createHoursSettlement, deleteHoursSettlement, getHoursSettlement } from '../db/hours-settlement.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlement = await getHoursSettlement();
        return sendSuccessMessage(res, hoursSettlement);
    }
);

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { workerId, activityId, description, date, amount } = req.body;
        await createHoursSettlement(activityId, req.user.id, workerId, amount, date, description);
        return sendSuccessMessage(res);
    }
);

router.delete(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlementId = +req.params.id;
        await deleteHoursSettlement(hoursSettlementId);
        return sendSuccessMessage(res);
    }
);

export default router;
