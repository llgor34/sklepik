import express from 'express';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getWorkers } from '../db/workers.mjs';
import { getUsedDiscount } from '../db/used-discount.mjs';
import { getOwedDiscount } from '../db/owed-discount.mjs';

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

router.get('/get-used-discount/:id', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.id;
    const usedDiscount = await getUsedDiscount(workerCode);

    res.send({ ok: true, message: 'SUCCESS', usedDiscount });
});

router.get('/get-owed-discount/:id', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.id;
    const owedDiscount = await getOwedDiscount(workerCode);

    res.send({ ok: true, message: 'SUCCESS', owedDiscount });
});

export default router;
