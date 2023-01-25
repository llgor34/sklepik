const express = require('express');
const { findOne } = require('./db-functions');
const { generateAccessToken, verifyAccessToken } = require('./auth-functions');

const port = 3000;
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
	const password = req.body?.password;

	if (!password) {
		return res
			.status(422)
			.send({ ok: false, message: 'NO_PASSWORD_PROVIDED' });
	}

	const user = await findOne('pracownicy', { haslo: password });

	if (!user) {
		return res.status(401).send({ ok: false, message: 'USER_NOT_FOUND' });
	}

	const token = generateAccessToken(user);

	return res.send({
		ok: true,
		token,
		user: { name: user.imie, surname: user.nazwisko, role: user.role },
	});
});

app.get('/', verifyAccessToken, (req, res) => res.send(req.user));

app.listen(port, () => {
	console.log(`⚡ Server running at: http://localhost:${port}`);
});
