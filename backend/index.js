const express = require('express');
const dbFunctions = require('./db-functions');
const authFunctions = require('./auth-functions');

const port = 3000;
const app = express();

app.get('/login', async (req, res) => {
	const password = '123';

	const user = await dbFunctions.findOne('pracownicy', { haslo: password });

	if (!user) {
		return res.status(401).send({ errorCode: 'USER_NOT_FOUND' });
	}

	const token = authFunctions.generateAccessToken(user._id);

	return res.send(token);
});

app.listen(port, () =>
	console.log(`⚡ Server running at: http://localhost:${port}`)
);
