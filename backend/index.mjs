import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import moment from 'moment';
import fs from 'fs';

import { generateAccessToken, verifyAccessToken, signJWTCookie, hasRoleMiddleware, hasRole, hashPassword } from './general/auth-functions.mjs';
import { getUserByPassword } from './db/auth.mjs';
import { getArticleByCode } from './db/articles.mjs';
import { sendErrorMessage } from './general/messages.mjs';
import { getAllCoffeeSubscriptions, updateCoffeeSubscriptionByAmount, updateCoffeeSubscriptionByReceiveCoffee } from './db/coffee-subscription.mjs';
import { createOrder } from './db/order.mjs';
import { getRaport } from './db/raport/sellment-close/get-raport.mjs';
import { generateRaport } from './db/raport/sellment-close/generate-raport.mjs';
import { generateRaportPDF } from './db/raport/sellment-close/generate-raport-pdf.mjs';
import { getWorkers } from './db/workers.mjs';
import { getActivities, createActivity } from './db/activities.mjs';
import { getUsedDiscount } from './db/used-discount.mjs';
import { getOwedDiscount } from './db/owed-discount.mjs';
import { deleteHoursSettlement, getHoursSettlement } from './db/worked-hours.mjs';

dotenv.config();
const port = 3000;
const app = express();

app.use(cors({ origin: ['localhost:4200', '127.0.0.1:4200'] }));
app.use(express.json());
app.use(cookieParser(process.env.TOKEN_SECRET));

app.get('/generate-password/:password', async (req, res) => {
    const { password } = req.params;
    const hash = hashPassword(password);
    return res.send(hash);
});

app.post('/login', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return sendErrorMessage(res, 422, 'PASSWORD_NOT_PROVIDED');
    }

    const user = await getUserByPassword(password);
    if (!user) {
        return sendErrorMessage(res, 401, 'USER_NOT_FOUND');
    }

    const token = generateAccessToken(user);
    signJWTCookie(res, token);

    const { name, surname, roles } = user;
    return res.send({
        ok: true,
        message: 'USER_LOGGED_IN',
        user: { name, surname, roles },
    });
});

// app.get('/', verifyAccessToken, (req, res) => res.send(req.user));

app.get('/product/:id', verifyAccessToken, async (req, res) => {
    const productCode = req.params.id;
    const product = await getArticleByCode(productCode);

    return res.send({ ok: true, message: 'SUCCESS', product: product });
});

app.get('/coffee-subscribers', verifyAccessToken, async (req, res) => {
    const coffeeSubscribers = await getAllCoffeeSubscriptions();
    res.send({ ok: true, message: 'SUCCESS', coffeeSubscribers });
});

app.get('/coffee-subscribers/update/:clientId/:amount', verifyAccessToken, async (req, res) => {
    const clientId = +req.params.clientId;
    const amount = +req.params.amount;

    await updateCoffeeSubscriptionByAmount(clientId, req.user.id, amount);
    res.send({ ok: true, message: 'SUCCESS' });
});

app.get('/coffee-subscribers/receive-coffee/:clientId', verifyAccessToken, async (req, res) => {
    const clientId = +req.params.clientId;

    await updateCoffeeSubscriptionByReceiveCoffee(clientId, req.user.id);
    res.send({ ok: true, message: 'SUCCESS' });
});

app.post('/order/create', verifyAccessToken, async (req, res) => {
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

    const discounts = products.filter(product => product.type === 'discount');
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
});

app.get('/raports/sellment-close/latest-raport-preview', verifyAccessToken, async (req, res) => {
    const data = await getRaport();
    res.send({ ok: true, message: 'SUCCESS', data });
});

app.get(
    '/raports/sellment-close/generate-raport',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const raportInfo = await generateRaport(req.user.id);

        if (!raportInfo) {
            return sendErrorMessage(res, 409, 'RAPORT_NOT_GENERATED');
        }

        const raport = await getRaport(raportInfo.id);
        const date = moment(raportInfo.date).format('DD.MM.YY');

        const raportPath = await generateRaportPDF(raport, date, raportInfo.number, raportInfo.year_number);
        const pdfFile = fs.readFileSync(raportPath);
        fs.rmSync(raportPath);

        res.contentType('application/pdf');
        res.send(pdfFile);
    }
);

app.get(
    '/workers/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const workers = await getWorkers();
        res.send({ ok: true, message: 'SUCCESS', workers });
    }
);

app.get('/workers/get-used-discount/:id', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.id;
    const usedDiscount = await getUsedDiscount(workerCode);

    res.send({ ok: true, message: 'SUCCESS', usedDiscount });
});

app.get('/workers/get-owed-discount/:id', verifyAccessToken, async (req, res) => {
    const workerCode = +req.params.id;
    const owedDiscount = await getOwedDiscount(workerCode);

    res.send({ ok: true, message: 'SUCCESS', owedDiscount });
});

app.get(
    '/hours-settlement/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlement = await getHoursSettlement();
        res.send({ ok: true, message: 'SUCCESS', hoursSettlement });
    }
);

app.get(
    '/hours-settlement/delete/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const hoursSettlementId = +req.params.id;
        await deleteHoursSettlement(hoursSettlementId);

        res.send({ ok: true, message: 'SUCCESS' });
    }
);

app.get(
    '/activities/get',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const activities = await getActivities();
        res.send({ ok: true, message: 'SUCCESS', activities });
    }
);

app.post(
    '/activities/create',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { workerId, activityId, description, date, amount } = req.body;
        await createActivity(activityId, req.user.id, workerId, amount, date, description);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

app.listen(port, () => {
    console.log(`⚡ Server running at: http://localhost:${port}`);
});
