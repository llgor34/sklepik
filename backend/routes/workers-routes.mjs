import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getWorkedHoursByWorkerId, getWorkers } from '../db/workers.mjs';
import {
    getUsedDiscountByWorkerCode,
    getUsedDiscountByWorkerId,
    getOwedDiscountByWorkerCode,
    getOwedDiscountByWorkerId,
} from '../db/worked-hours.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const workers = await getWorkers();
        sendSuccessMessage(res, workers);
    }
);

router.get('/used-discount/:workerCode', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.workerCode;
    const usedDiscount = await getUsedDiscountByWorkerCode(workerCode);

    sendSuccessMessage(res, usedDiscount);
});

router.get('/current-user-used-discount', verifyAccessToken, async (req, res) => {
    const workerdId = req.user.id;
    const usedDiscount = await getUsedDiscountByWorkerId(workerdId);

    sendSuccessMessage(res, usedDiscount);
});

router.get('/owed-discount/:workerCode', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.workerCode;
    const owedDiscount = await getOwedDiscountByWorkerCode(workerCode);

    sendSuccessMessage(res, owedDiscount);
});

router.get('/current-user-owed-discount', verifyAccessToken, async (req, res) => {
    const workerId = req.user.id;
    const owedDiscount = await getOwedDiscountByWorkerId(workerId);

    sendSuccessMessage(res, owedDiscount);
});

router.get('/current-user-worked-hours', verifyAccessToken, async (req, res) => {
    const workerId = req.user.id;
    const workedHoursAmount = await getWorkedHoursByWorkerId(workerId);

    sendSuccessMessage(res, workedHoursAmount);
});

export default router;
