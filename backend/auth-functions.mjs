import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateAccessToken(user) {
	return jwt.sign({ _id: user._id, roles: user.role }, process.env.TOKEN_SECRET, {
		expiresIn: '1800000s',
	});
}

export function verifyAccessToken(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).send({ ok: false, message: 'AUTH_TOKEN_NOT_PROVIDED' });
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ ok: false, message: 'AUTH_TOKEN_INVALID' });
		}

		req.user = decoded;
		next();
	});
}
