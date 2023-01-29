import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { generateAccessToken, verifyAccessToken, signJWTCookie } from './auth-functions.mjs';
import { pracownicy } from './mongoose/pracownicy.mjs';
import { artykuly } from './mongoose/artykuly.mjs';
import { zamkniecie_sprzedazy } from './mongoose/zamkniecie-sprzedazy.mjs';

dotenv.config();
const port = 3000;
const app = express();

app.use(cors({ origin: ['localhost:4200', '127.0.0.1:4200'] }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));

app.post('/login', async (req, res) => {
	const password = req.body?.password;
	if (!password) {
		return res.status(422).send({ ok: false, message: 'PASSWORD_NOT_PROVIDED' });
	}

	const user = await pracownicy.findOne({ haslo: password });
	if (!user) {
		return res.status(401).send({ ok: false, message: 'USER_NOT_FOUND' });
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

app.post('/sell/insert', verifyAccessToken, async (req, res) => {
	const { products } = req.body;

	if (products.length < 1) {
		return res.status(422).send({ ok: false, message: 'PRODUCTS_NOT_PROVIDED' });
	}

	const sellObj = {
		id_pracownika: req.user._id,
		lista_zakupow: products.map(product => ({
			id_artykulu: product._id,
			cena: product.cena,
			ilosc: product.ilosc,
		})),
	};

	await zamkniecie_sprzedazy.findOneAndUpdate({}, { $push: { sprzedane_towary: sellObj } }).sort({ _id: -1 });
	res.send({ ok: true, message: 'SELL_CREATED' });
});

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
