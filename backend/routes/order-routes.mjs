import express from 'express';

import { verifyAccessToken, hasRole } from '../general/auth-functions.mjs';
import { sendErrorMessage } from '../general/messages.mjs';
import { getUsedDiscountByWorkerCode, getOwedDiscountByWorkerCode } from '../db/worked-hours.mjs';
import { createOrder, getLatestOrderId, getOrderNumber, updateOrderStatus } from '../db/order.mjs';
import { onOrdersChange, onOrderStatusReady } from '../ws-events/orders.mjs';

const router = express.Router();

router.get('/current-order-number', verifyAccessToken, async (req, res) => {
    const orderId = await getLatestOrderId();
    const orderNumber = getOrderNumber(orderId + 1);
    res.send({ ok: true, message: 'SUCCESS', orderNumber: orderNumber });
});

router.post('/', verifyAccessToken, async (req, res) => {
    const { products, paymentMethod, lessonId } = req.body;

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
        const usedDiscount = await getUsedDiscountByWorkerCode(discount.code);
        const owedDiscount = await getOwedDiscountByWorkerCode(discount.code);

        const leftDiscount = owedDiscount + usedDiscount + discount.amount * +discount.price;
        if (leftDiscount < 0) {
            return sendErrorMessage(res, 422, 'DISCOUNT_TOO_HIGH');
        }
    }

    if (products.length < 1) {
        return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
    }

    const orderNumber = await createOrder(products, paymentMethod, lessonId, req.user.id);
    res.send({ ok: true, message: 'SELL_CREATED', orderNumber });

    await onOrdersChange();
});

router.put('/update-status', verifyAccessToken, async (req, res) => {
    const { orderId: order_id, orderStatus: order_status } = req.body;
    await updateOrderStatus(order_id, order_status);

    res.send({ ok: true, message: 'SUCCESS' });

    await onOrdersChange();
    if (order_status === 'done') {
        const order_number = getOrderNumber(order_id);
        await onOrderStatusReady(order_number);
    }
});

export default router;
