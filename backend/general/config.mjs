export const config = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? '',
    httpServerPort: process.env.HTTP_SERVER_PORT,
    websockerServerPort: process.env.WEBSOCKET_SERVER_PORT,
};
