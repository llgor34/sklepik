import { config } from './config.mjs';

export function getHttpServerPort() {
    return config.httpServerPort ?? 3000;
}

export function getWsServerPort() {
    return config.websockerServerPort ?? 3001;
}
