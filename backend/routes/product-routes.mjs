import express from 'express';

import { verifyAccessToken } from '../general/auth-functions.mjs';
import { getArticleByCode } from '../db/articles.mjs';

const router = express.Router();

router.get('/:id', verifyAccessToken, async (req, res) => {
    const productCode = req.params.id;
    const product = await getArticleByCode(productCode);

    return res.send({ ok: true, message: 'SUCCESS', product: product });
});

export default router;
