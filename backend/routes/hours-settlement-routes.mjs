import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getHoursSettlement, deleteHoursSettlement } from '../db/worked-hours.mjs';

const router = express.Router();

router.get(
    '/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlement = await getHoursSettlement();
        res.send({ ok: true, message: 'SUCCESS', hoursSettlement });
    }
);

router.get(
    '/delete/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlementId = +req.params.id;
        await deleteHoursSettlement(hoursSettlementId);

        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
