import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { emitOrdersFor } from './ws-events/orders.mjs';

import authRoutes from './routes/auth-routes.mjs';
import productRoutes from './routes/product-routes.mjs';
import orderRoutes from './routes/order-routes.mjs';
import raportsRoutes from './routes/raports-routes.mjs';
import workersRoutes from './routes/workers-routes.mjs';
import hoursSettlementRoutes from './routes/hours-settlement-routes.mjs';
import activitiesRoutes from './routes/activities-routes.mjs';
import lessonsRoutes from './routes/lessons-routes.mjs';
import versionRoutes from './routes/version-routes.mjs';
import movieRoutes from './routes/movie-routes.mjs';
import userRoutes from './routes/user-routes.mjs';
import rolesRoutes from './routes/roles-routes.mjs';

dotenv.config();

// server config
const app = express();
app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());
app.use(cookieParser(process.env.TOKEN_SECRET));

export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
    },
    connectionStateRecovery: {},
});

// websocket routes
export const ordersNamespace = io.of('/orders');
ordersNamespace.on('connection', async (socket) => {
    await emitOrdersFor(socket);
});

// http-server routes
const router = express.Router();
app.use('/api', router);

router.use('/', authRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/raports', raportsRoutes);
router.use('/workers', workersRoutes);
router.use('/hours-settlement', hoursSettlementRoutes);
router.use('/activities', activitiesRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/version', versionRoutes);
router.use('/movie', movieRoutes);
router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);

// host angular-app
app.use('/', express.static('dist'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// start server
const serverPort = process.env.PORT;
server.listen(serverPort, () => {
    console.log(`⚡ WebServer running at: http://localhost:${serverPort}`);
});
