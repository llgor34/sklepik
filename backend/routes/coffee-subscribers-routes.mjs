import express from 'express';

import { verifyAccessToken } from '../general/auth-functions.mjs';
import {
    getAllCoffeeSubscriptions,
    updateCoffeeSubscriptionByAmount,
    updateCoffeeSubscriptionByReceiveCoffee,
} from '../db/coffee-subscription.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const coffeeSubscribers = await getAllCoffeeSubscriptions();
    res.send({ ok: true, message: 'SUCCESS', coffeeSubscribers });
});

router.get('/update/:clientId/:amount', verifyAccessToken, async (req, res) => {
    const clientId = +req.params.clientId;
    const amount = +req.params.amount;

    await updateCoffeeSubscriptionByAmount(clientId, req.user.id, amount);
    res.send({ ok: true, message: 'SUCCESS' });
});

router.get('/receive-coffee/:clientId', verifyAccessToken, async (req, res) => {
    const clientId = +req.params.clientId;

    await updateCoffeeSubscriptionByReceiveCoffee(clientId, req.user.id);
    res.send({ ok: true, message: 'SUCCESS' });
});

export default router;
