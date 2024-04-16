import express from 'express';

import { hasRoleMiddleware, verifyAccessToken } from '../general/auth-functions.mjs';
import {
    createArticle,
    deleteArticle,
    getArticleByCode,
    getArticles,
    getLatestArticleId,
    updateArticle,
} from '../db/articles.mjs';
import { sendErrorMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const articles = await getArticles();
    res.send({ ok: true, message: 'SUCCESS', products: articles });
});

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { price, code, type, short_name, full_name } = req.body;
        await createArticle(price, code, type, short_name, full_name);

        const articleId = await getLatestArticleId();
        res.send({ ok: true, message: 'SUCCESS', id: articleId });
    }
);

router.get('/:code', verifyAccessToken, async (req, res) => {
    const productCode = req.params.code;
    const product = await getArticleByCode(productCode);

    return res.send({ ok: true, message: 'SUCCESS', product: product });
});

router.put(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const articleData = req.body;
        const articleId = +req.params.id;

        await updateArticle(articleData, articleId);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

router.delete(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const articleId = +req.params.id;
        try {
            await deleteArticle(articleId);
        } catch (error) {
            return sendErrorMessage(res, 409, 'DELETE_CONSTRAINT_CONFLICT_PRODUCT');
        }
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
