import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { generateAccessToken, verifyAccessToken, signJWTCookie, verifyPassword } from './auth-functions.mjs';
import { getUserByUsername } from './db/auth.mjs';
import { getArticleById } from './db/articles.mjs';
import { sendErrorMessage } from './messages.mjs';
import { getAllCoffeeSubscriptions, updateCoffeeSubscriptionByAmount, updateCoffeeSubscriptionByReceiveCoffee } from './db/coffee-subscription.mjs';
import { createOrder } from './db/order.mjs';

dotenv.config();
const port = 3000;
const app = express();

app.use(cors({ origin: ['localhost:4200', '127.0.0.1:4200'] }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));

app.post('/login', async (req, res) => {
	const { password, username } = req.body;
	if (!password) {
		return sendErrorMessage(res, 422, 'PASSWORD_NOT_PROVIDED');
	}

	if (!username) {
		return sendErrorMessage(res, 422, 'USERNAME_NOT_PROVIDED');
	}

	const user = await getUserByUsername(username);
	if (!user) {
		return sendErrorMessage(res, 401, 'USER_NOT_FOUND');
	}

	const isPasswordValid = await verifyPassword(password, user.password);
	if (!isPasswordValid) {
		return sendErrorMessage(res, 401, 'PASSWORD_INVALID');
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

app.post('/sell/insert', verifyAccessToken, async (req, res) => {
	const { products, paymentMethod } = req.body;

	if (products.length < 1) {
		return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
	}

	await createOrder(products, paymentMethod, req.user.id);
	res.send({ ok: true, message: 'SELL_CREATED' });
});

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
