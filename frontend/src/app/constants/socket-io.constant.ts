import { InjectionToken } from '@angular/core';
import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';

export const SOCKET_IO = new InjectionToken<(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) => Socket>(
    'Socket IO',
    {
        providedIn: 'root',
        factory: () => io,
    }
);
