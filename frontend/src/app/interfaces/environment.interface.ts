import { ManagerOptions, SocketOptions } from 'socket.io-client';

export interface Environment {
    wsAddress: `ws://${string}`;
    wsConfig: Partial<ManagerOptions & SocketOptions>;
}
