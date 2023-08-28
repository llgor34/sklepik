import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { sendErrorMessage } from './messages.mjs';

dotenv.config();

export function generateAccessToken(user) {
	return jwt.sign({ id: user.id, roles: user.roles }, process.env.SECRET, {
		expiresIn: `${process.env.EXPIRATION_TIME_IN_SECONDS}s`,
	});
}

export function verifyAccessToken(req, res, next) {
	const token = req.signedCookies.jwt;

	if (!token) {
		return sendErrorMessage(res, 401, 'AUTH_TOKEN_NOT_PROVIDED');
	}

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) {
			res.clearCookie('jwt');
			return sendErrorMessage(res, 401, 'AUTH_TOKEN_EXPIRED');
		}

		req.user = decoded;
		next();
	});
}

export async function verifyPassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

export async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

export function signJWTCookie(res, token) {
	res.cookie('jwt', token, { signed: true, httpOnly: true, expires: new Date(Date.now() + process.env.EXPIRATION_TIME_IN_SECONDS * 1000) });
}

export function hasRole(req, res, next, role) {
	if (!req.user.roles.includes(role)) {
		return sendErrorMessage(res, 401, 'INSUFFICIENT_PERMISSIONS');
	}
	next();
}
