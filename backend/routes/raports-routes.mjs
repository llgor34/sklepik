import express from 'express';
import moment from 'moment';
import fs from 'fs';

import { verifyAccessToken, hasRoleMiddleware } from '../general/auth-functions.mjs';
import { getRaport } from '../db/raport/sellment-close/get-raport.mjs';
import { generateRaport } from '../db/raport/sellment-close/generate-raport.mjs';
import { generateRaportPDF } from '../db/raport/sellment-close/generate-raport-pdf.mjs';
import { sendErrorMessage } from '../general/messages.mjs';

const router = express.Router();

router.get('/sellment-close/latest-raport-preview', verifyAccessToken, async (req, res) => {
    const data = await getRaport();
    res.send({ ok: true, message: 'SUCCESS', data });
});

router.get(
    '/sellment-close/generate-raport',
    verifyAccessToken,
    (...args) => hasRoleMiddleware(...args, 'admin'),
    async (req, res) => {
        const raportInfo = await generateRaport(req.user.id);

        if (!raportInfo) {
            return sendErrorMessage(res, 409, 'RAPORT_NOT_GENERATED');
        }

        const raport = await getRaport(raportInfo.id);
        const date = moment(raportInfo.date).format('DD.MM.YY');

        const raportPath = await generateRaportPDF(raport, date, raportInfo.number, raportInfo.year_number);
        const pdfFile = fs.readFileSync(raportPath);
        fs.rmSync(raportPath);

        res.contentType('application/pdf');
        res.send(pdfFile);
    }
);

export default router;
