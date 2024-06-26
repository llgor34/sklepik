import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { sendErrorMessage } from './messages.mjs';

dotenv.config();

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id, roles: user.roles }, process.env.TOKEN_SECRET, {
        expiresIn: `${process.env.TOKEN_EXPIRATION_TIME_IN_SECONDS}s`,
    });
}

export function verifyAccessToken(req, res, next) {
    const token = req.signedCookies.jwt;

    if (!token) {
        return sendErrorMessage(res, 401, 'AUTH_TOKEN_NOT_PROVIDED');
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('jwt');
            return sendErrorMessage(res, 401, 'AUTH_TOKEN_EXPIRED');
        }

        req.user = decoded;
        next();
    });
}

export function signJWTCookie(res, token) {
    res.cookie('jwt', token, {
        signed: true,
        httpOnly: true,
        expires: new Date(Date.now() + process.env.TOKEN_EXPIRATION_TIME_IN_SECONDS * 1000),
    });
}

export function hasRoleMiddleware(req, res, next, role) {
    if (!hasRole(req.user.roles, role)) {
        return sendErrorMessage(res, 401, 'INSUFFICIENT_PERMISSIONS');
    }
    next();
}

export function hasRole(userRoles, requiredRole) {
    return userRoles?.some((userRole) => userRole.label === requiredRole);
}
