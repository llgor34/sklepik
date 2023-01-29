import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateAccessToken(user) {
	return jwt.sign({ _id: user._id, roles: user.role }, process.env.SECRET, {
		expiresIn: `${process.env.EXPIRATION_TIME_IN_SECONDS}s`,
	});
}

export function verifyAccessToken(req, res, next) {
	const token = req.signedCookies.jwt;

	if (!token) {
		return res.status(401).send({ ok: false, message: 'AUTH_TOKEN_NOT_PROVIDED' });
	}

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) {
			res.clearCookie('jwt');
			return res.status(401).send({ ok: false, message: 'AUTH_TOKEN_EXPIRED' });
		}

		req.user = decoded;
		next();
	});
}

export function signJWTCookie(res, token) {
	res.cookie('jwt', token, { signed: true, httpOnly: true, expires: new Date(Date.now() + process.env.EXPIRATION_TIME_IN_SECONDS * 1000) });
}
