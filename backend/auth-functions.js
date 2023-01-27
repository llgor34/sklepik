const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user) {
	return jwt.sign({ _id: user._id, roles: user.role }, process.env.TOKEN_SECRET, {
		expiresIn: '1800s',
	});
}

function verifyAccessToken(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).send({ ok: false, message: 'TOKEN_NOT_PROVIDED' });
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ ok: false, message: 'TOKEN_INVALID' });
		}

		req.user = decoded;
		next();
	});
}

module.exports = { generateAccessToken, verifyAccessToken };
