import { ManagerOptions, SocketOptions } from 'socket.io-client';

export interface Environment {
    apiAddress: `${'http' | 'https'}://${string}`;
    wsAddress: `ws://${string}`;
    wsConfig: Partial<ManagerOptions & SocketOptions>;
}
