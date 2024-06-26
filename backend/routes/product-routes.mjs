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
import { sendErrorMessage, sendSuccessMessage } from '../general/messages.mjs';
import { createLog } from '../db/logs.mjs';

const router = express.Router();

router.get('/', verifyAccessToken, async (req, res) => {
    const { orderBy, orderType } = req.query;

    // try {
    const articles = await getArticles(orderBy?.trim()?.toLowerCase(), orderType?.trim()?.toUpperCase());
    sendSuccessMessage(res, articles);
    // } catch (error) {
    // return sendErrorMessage(res, 400, 'INVALID_PARAMETERS');
    // }
});

router.post(
    '/',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const { price, code, type, short_name, full_name } = req.body;
        await createArticle(price, code, type, short_name, full_name);

        const articleId = await getLatestArticleId();
        sendSuccessMessage(res, articleId);

        await createLog('ARTICLE_CREATED', `Article with id ${articleId} has been created`, req.user.id);
    }
);

router.get('/:code', verifyAccessToken, async (req, res) => {
    const productCode = req.params.code;
    const product = await getArticleByCode(productCode);

    sendSuccessMessage(res, product);
});

router.put(
    '/:id',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const fieldData = req.body;
        const articleId = +req.params.id;

        const preparedData = {
            ...fieldData,
            company_id: fieldData.company?.id,
            company: undefined,
        };

        await updateArticle(articleId, preparedData);
        sendSuccessMessage(res);

        await createLog('ARTICLE_MODIFIED', `Article with id ${articleId} has been modified`, req.user.id);
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
        sendSuccessMessage(res);

        await createLog('ARTICLE_DELETED', `Article with id ${articleId} has been deleted`, req.user.id);
    }
);

export default router;
