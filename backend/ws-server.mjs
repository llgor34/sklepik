import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { emitOrdersFor } from './ws-events/orders.mjs';
import { getHttpServerPort, getWsServerPort } from './general/server-port.mjs';

dotenv.config();

// websocket config
const serverPort = getHttpServerPort();
const websocketPort = getWsServerPort();
const io = new Server(websocketPort, {
    cors: {
        origin: ['http://localhost:4200', `http://localhost:${serverPort}`],
        methods: ['GET', 'POST'],
        credentials: true,
    },
    connectionStateRecovery: {},
});

// websocket routes
export const ordersNamespace = io.of('/orders');
ordersNamespace.on('connection', async (socket) => {
    await emitOrdersFor(socket);
});
