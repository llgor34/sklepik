import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { generateAccessToken, verifyAccessToken, signJWTCookie, verifyPassword } from './auth-functions.mjs';
import { sendErrorMessage } from './messages.mjs';
import { pracownicy } from './mongoose/pracownicy.mjs';
import { artykuly } from './mongoose/artykuly.mjs';
import { zamkniecie_sprzedazy } from './mongoose/zamkniecie-sprzedazy.mjs';
import { abonament_kawowy } from './mongoose/abonament-kawowy.mjs';
import { ObjectId } from 'mongodb';

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

	const user = await pracownicy.findOne({ nazwa_uzytkownika: username });
	if (!user) {
		return sendErrorMessage(res, 401, 'USER_NOT_FOUND');
	}

	const isPasswordValid = await verifyPassword(password, user.haslo);
	if (!isPasswordValid) {
		return sendErrorMessage(res, 401, 'PASSWORD_INVALID');
	}

	const token = generateAccessToken(user);
	signJWTCookie(res, token);

	return res.send({
		ok: true,
		message: 'USER_LOGGED_IN',
		user: { name: user.imie, surname: user.nazwisko, role: user.role },
	});
});

// app.get('/', verifyAccessToken, (req, res) => res.send(req.user));

app.get('/product/:id', verifyAccessToken, async (req, res) => {
	const productCode = req.params.id;
	const product = await artykuly.findOne({ kod: productCode });

	return res.send({ ok: true, message: 'SUCCESS', product: product });
});

app.get('/coffee-subscribers', verifyAccessToken, async (req, res) => {
	if (!req.user.roles.includes('admin')) {
		return sendErrorMessage(res, 401, 'INSUFFICIENT_PERMISSIONS');
	}

	const coffeeSubscribers = await abonament_kawowy.find();
	res.send({ ok: true, message: 'SUCCESS', coffeeSubscribers });
});

app.post('/sell/insert', verifyAccessToken, async (req, res) => {
	const { products } = req.body;

	if (products.length < 1) {
		return sendErrorMessage(res, 422, 'PRODUCTS_NOT_PROVIDED');
	}

	const sellObj = {
		id_pracownika: new ObjectId(req.user._id),
		lista_zakupow: await Promise.all(
			products.map(async product => {
				const productFromDB = await artykuly.findOne({ _id: product._id });
				return {
					id_artykulu: new ObjectId(product._id),
					cena: productFromDB.cena,
					ilosc: product.ilosc,
				};
			})
		),
	};

	await zamkniecie_sprzedazy.findOneAndUpdate({}, { $push: { sprzedane_towary: sellObj } }).sort({ _id: -1 });
	res.send({ ok: true, message: 'SELL_CREATED' });
});

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
