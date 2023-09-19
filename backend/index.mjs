import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import moment from 'moment';
import fs from 'fs';

import { generateAccessToken, verifyAccessToken, signJWTCookie, hasRole, hashPassword } from './general/auth-functions.mjs';
import { getUserByPassword } from './db/auth.mjs';
import { getArticleById } from './db/articles.mjs';
import { sendErrorMessage } from './general/messages.mjs';
import { getAllCoffeeSubscriptions, updateCoffeeSubscriptionByAmount, updateCoffeeSubscriptionByReceiveCoffee } from './db/coffee-subscription.mjs';
import { createOrder } from './db/order.mjs';
import { getRaport } from './db/raport/sellment-close/get-raport.mjs';
import { generateRaport } from './db/raport/sellment-close/generate-raport.mjs';
import { generateRaportPDF } from './db/raport/sellment-close/generate-raport-pdf.mjs';

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
	const product = await getArticleById(productCode);

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

	if (products.length < 1) {
		return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
	}

	await createOrder(products, paymentMethod, req.user.id);
	res.send({ ok: true, message: 'SELL_CREATED' });
});

app.get('/raports/sellment-close/latest-raport-preview', verifyAccessToken, async (req, res) => {
	const data = await getRaport();
	res.send({ ok: true, message: 'SUCCESS', data });
});

app.get(
	'/raports/sellment-close/generate-raport',
	verifyAccessToken,
	(...args) => hasRole(...args, 'admin'),
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

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
