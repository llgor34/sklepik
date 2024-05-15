import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { createHoursSettlement, deleteHoursSettlement, getHoursSettlement } from '../db/hours-settlement.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlement = await getHoursSettlement();
        res.send({ ok: true, message: 'SUCCESS', hoursSettlement });
    }
);

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { workerId, activityId, description, date, amount } = req.body;
        await createHoursSettlement(activityId, req.user.id, workerId, amount, date, description);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

router.delete(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlementId = +req.params.id;
        await deleteHoursSettlement(hoursSettlementId);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
