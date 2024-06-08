import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    createConnection(path: string): Socket {
        return io(path, environment.wsConfig);
    }

    closeConnection(socket: Socket): void {
        socket.close();
    }
}
