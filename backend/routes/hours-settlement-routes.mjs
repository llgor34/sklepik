import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import {
    createHoursSettlement,
    deleteHoursSettlement,
    getHoursSettlement,
    getLatestHoursSettlementId,
    updateHoursSettlement,
} from '../db/hours-settlement.mjs';
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

router.put(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hours_settlement_id = +req.params.id;
        const admin_id = req.user.id;
        const { activity_id, worker_id, amount, description, work_date } = req.body;

        await updateHoursSettlement(hours_settlement_id, {
            activity_id,
            worker_id,
            amount,
            description,
            work_date,
            admin_id,
        });

        return sendSuccessMessage(res);
    }
);

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { activity_id, worker_id, amount, description, work_date } = req.body;

        await createHoursSettlement(activity_id, req.user.id, worker_id, amount, work_date, description);
        const hoursSettlementId = await getLatestHoursSettlementId();

        return sendSuccessMessage(res, hoursSettlementId);
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
