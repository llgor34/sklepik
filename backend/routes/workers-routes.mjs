import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getWorkedHoursByWorkerId, getWorkers } from '../db/workers.mjs';
import { getUsedDiscountByWorkerCode, getUsedDiscountByWorkerId } from '../db/used-discount.mjs';
import { getOwedDiscountByWorkerCode, getOwedDiscountByWorkerId } from '../db/owed-discount.mjs';

const router = express.Router();

router.get(
    '/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const workers = await getWorkers();
        res.send({ ok: true, message: 'SUCCESS', workers });
    }
);

router.get('/get-used-discount/:workerCode', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.workerCode;
    const usedDiscount = await getUsedDiscountByWorkerCode(workerCode);

    res.send({ ok: true, message: 'SUCCESS', usedDiscount });
});

router.get('/get-used-discount-by-id', verifyAccessToken, async (req, res) => {
    const workerdId = req.user.id;
    const usedDiscount = await getUsedDiscountByWorkerId(workerdId);

    res.send({ ok: true, message: 'SUCCESS', usedDiscount });
});

router.get('/get-owed-discount/:workerCode', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.workerCode;
    const owedDiscount = await getOwedDiscountByWorkerCode(workerCode);

    res.send({ ok: true, message: 'SUCCESS', owedDiscount });
});

router.get('/get-owed-discount-by-id', verifyAccessToken, async (req, res) => {
    const workerId = req.user.id;
    const owedDiscount = await getOwedDiscountByWorkerId(workerId);

    res.send({ ok: true, message: 'SUCCESS', owedDiscount });
});

router.get('/get-worked-hours', verifyAccessToken, async (req, res) => {
    const workerId = req.user.id;
    const workedHoursAmount = await getWorkedHoursByWorkerId(workerId);

    res.send({ ok: true, message: 'SUCCESS', workedHoursAmount });
});

export default router;
