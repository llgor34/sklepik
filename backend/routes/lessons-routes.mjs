import express from 'express';
import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getLessons } from '../db/lesson.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const lessons = await getLessons();
    res.send({ ok: true, lessons });
});

export default router;
