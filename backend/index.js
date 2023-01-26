const express = require('express');
const cors = require('cors');
const { findOne } = require('./db-functions');
const { generateAccessToken, verifyAccessToken } = require('./auth-functions');

const port = 3000;
const app = express();

app.use(cors({ origin: ['localhost:4200', '127.0.0.1:4200'] }));
app.use(express.json());

app.post('/login', async (req, res) => {
	const password = req.body?.password;
	if (!password) {
		return res.status(422).send({ ok: false, message: 'PASSWORD_NOT_PROVIDED' });
	}

	const user = await findOne('pracownicy', { haslo: password });
	if (!user) {
		return res.status(401).send({ ok: false, message: 'USER_NOT_FOUND' });
	}

	const token = generateAccessToken(user);
	return res.send({
		ok: true,
		message: 'USER_LOGGED_IN',
		user: { name: user.imie, surname: user.nazwisko, role: user.role },
		token,
	});
});

// app.get('/', verifyAccessToken, (req, res) => res.send(req.user));

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
