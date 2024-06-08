import { Injectable, inject } from '@angular/core';
import { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { SOCKET_IO } from '../constants/socket-io.constant';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private io = inject(SOCKET_IO);

    createConnection(path: string): Socket {
        return this.io(path, environment.wsConfig);
    }

    closeConnection(socket: Socket): void {
        socket.close();
    }
}
