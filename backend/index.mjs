import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { getHttpServerPort, getWsServerPort } from './general/server-port.mjs';

import authRoutes from './routes/auth-routes.mjs';
import coffeeSubscribersRouter from './routes/coffee-subscribers-routes.mjs';
import productRoutes from './routes/product-routes.mjs';
import orderRoutes from './routes/order-routes.mjs';
import raportsRoutes from './routes/raports-routes.mjs';
import workersRoutes from './routes/workers-routes.mjs';
import hoursSettlementRoutes from './routes/hours-settlement-routes.mjs';
import activitiesRoutes from './routes/activities-routes.mjs';
import lessonsRoutes from './routes/lessons-routes.mjs';
import versionRoutes from './routes/version-routes.mjs';

export * from './ws-server.mjs';

dotenv.config();

// http-server config
const websocketPort = getWsServerPort();
const serverPort = getHttpServerPort();
const app = express();
app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());
app.use(cookieParser(process.env.TOKEN_SECRET));

// http-server routes
const router = express.Router();
app.use('/api', router);

router.use('/', authRoutes);
router.use('/coffee-subscribers', coffeeSubscribersRouter);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/raports', raportsRoutes);
router.use('/workers', workersRoutes);
router.use('/hours-settlement', hoursSettlementRoutes);
router.use('/activities', activitiesRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/version', versionRoutes);

// host angular-app
app.use('/', express.static('dist'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// start http-server
app.listen(serverPort, () => {
    console.log(`⚡ WebServer running at: http://localhost:${serverPort}`);
    console.log(`⚡ SocketServer running at: http://localhost:${websocketPort}`);
});
