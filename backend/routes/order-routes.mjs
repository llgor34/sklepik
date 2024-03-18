import express from 'express';

import { verifyAccessToken, hasRole } from '../general/auth-functions.mjs';
import { sendErrorMessage } from '../general/messages.mjs';
import { getUsedDiscount } from '../db/used-discount.mjs';
import { getOwedDiscount } from '../db/owed-discount.mjs';
import { createOrder, updateOrderStatus } from '../db/order.mjs';
import { onOrdersChange } from '../ws-events/orders.mjs';

const router = express.Router();

router.post('/create', verifyAccessToken, async (req, res) => {
    const { products, paymentMethod } = req.body;

    let totalPrice = 0;
    for (const product of products) {
        totalPrice += +product.price * product.amount;
    }
    if (totalPrice < 0) {
        if (!hasRole(req.user.roles, 'admin')) {
            return sendErrorMessage(res, 422, 'NEGATIVE_PRICE');
        }
    }

    const discounts = products.filter((product) => product.type === 'discount');
    for (const discount of discounts) {
        const usedDiscount = await getUsedDiscount(discount.code);
        const owedDiscount = await getOwedDiscount(discount.code);

        const leftDiscount = owedDiscount + usedDiscount + discount.amount * +discount.price;
        if (leftDiscount < 0) {
            return sendErrorMessage(res, 422, 'DISCOUNT_TOO_HIGH');
        }
    }

    if (products.length < 1) {
        return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
    }

    const orderNumber = await createOrder(products, paymentMethod, req.user.id);
    res.send({ ok: true, message: 'SELL_CREATED', orderNumber });

    await onOrdersChange();
});

router.put('/update-status', verifyAccessToken, async (req, res) => {
    const { orderId: order_id, orderStatus: order_status } = req.body;
    await updateOrderStatus(order_id, order_status);
    res.send({ ok: true, message: 'SUCCESS' });

    await onOrdersChange();
});

export default router;
