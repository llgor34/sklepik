import express from 'express';

import { verifyAccessToken, hasRole } from '../general/auth-functions.mjs';
import { sendErrorMessage, sendSuccessMessage } from '../general/messages.mjs';
import { calculateTotalPrice, getProductsByType, getDiscountLeft } from '../db/order.mjs';
import { createOrder, getLatestOrderId, getOrderNumber, updateOrderStatus } from '../db/order.mjs';
import { onOrdersChange, onOrderStatusReady } from '../ws-events/orders.mjs';
import { updateArticlesStockAmount } from '../db/articles.mjs';

const router = express.Router();

router.get('/current-order-number', verifyAccessToken, async (req, res) => {
    const orderId = await getLatestOrderId();
    const orderNumber = getOrderNumber(orderId + 1);
    return sendSuccessMessage(res, orderNumber);
});

router.post('/', verifyAccessToken, async (req, res) => {
    const { products, paymentMethod, lessonId } = req.body;

    if (products.length < 1) {
        return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
    }

    const totalPrice = calculateTotalPrice(products);
    if (totalPrice < 0 && !hasRole(req.user.roles, 'admin')) {
        return sendErrorMessage(res, 422, 'NEGATIVE_PRICE');
    }

    const discounts = getProductsByType(products, 'discount');
    for (const discount of discounts) {
        const discountLeft = await getDiscountLeft(discount.code, discount.amount, +discount.price);
        if (discountLeft < 0) {
            return sendErrorMessage(res, 422, 'DISCOUNT_TOO_HIGH');
        }
    }

    const orderNumber = await createOrder(products, paymentMethod, lessonId, req.user.id);
    await updateArticlesStockAmount(products);

    sendSuccessMessage(res, orderNumber, 'SELL_CREATED');
    await onOrdersChange();
});

router.put('/update-status', verifyAccessToken, async (req, res) => {
    const { orderId: order_id, orderStatus: order_status } = req.body;
    await updateOrderStatus(order_id, order_status);

    sendSuccessMessage(res);

    await onOrdersChange();
    if (order_status === 'done') {
        const order_number = getOrderNumber(order_id);
        await onOrderStatusReady(order_number);
    }
});

export default router;
