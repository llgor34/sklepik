import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getLessons } from '../db/lesson.mjs';
import { sendSuccessMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const lessons = await getLessons();
    return sendSuccessMessage(res, lessons);
});

export default router;
