const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user) {
	return jwt.sign(
		{ _id: user._id, roles: user.role },
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1800s',
		}
	);
}

function verifyAccessToken(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return showNotAuthorizedError(res);
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return showNotAuthorizedError(res);
		}

		req.user = decoded;
		next();
	});
}

function showNotAuthorizedError(res) {
	res.status(401).json({
		ok: false,
		message: 'AUTH_FAILED',
	});
}

module.exports = { generateAccessToken, verifyAccessToken };
