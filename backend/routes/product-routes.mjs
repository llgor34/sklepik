import express from 'express';

import { hasRoleMiddleware, verifyAccessToken } from '../general/auth-functions.mjs';
import { createArticle, deleteArticle, getArticleByCode, getArticles, updateArticle } from '../db/articles.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const articles = await getArticles();
    console.log(JSON.stringify(articles));
    res.send({ ok: true, message: 'SUCCESS', articles });
});

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { price, code, type, short_name, full_name } = req.body;

        const isProductDataValid = verifyProductDataIntegrity(req, res);
        if (!isProductDataValid) return;

        await createArticle(price, code, type, short_name, full_name);
        res.send({ ok: true, message: 'SUCCESS' });
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
        await deleteArticle(articleId);
        res.send({ ok: true, message: 'SUCCESS' });
    }
);

export default router;
