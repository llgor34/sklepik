import { ManagerOptions, SocketOptions } from 'socket.io-client';

export interface Environment {
    wsAddress: `http://${string}`;
    wsConfig: Partial<ManagerOptions & SocketOptions>;
    itemsPerPage: number;
}
