import dotenv from 'dotenv';

dotenv.config();

export function getHttpServerPort() {
    return process.env.HTTP_SERVER_PORT ?? 3000;
}

export function getWsServerPort() {
    return process.env.WEBSOCKET_SERVER_PORT ?? 3001;
}
