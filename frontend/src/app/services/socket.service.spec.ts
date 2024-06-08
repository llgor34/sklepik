import { TestBed } from '@angular/core/testing';
import { SocketService } from './socket.service';
import { SOCKET_IO } from '../constants/socket-io.constant';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

describe('SocketService', () => {
    let service: SocketService;
    let socketIOSpy: jasmine.Spy<typeof io>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SocketService,
                {
                    provide: SOCKET_IO,
                    useValue: jasmine.createSpy('Socket IO'),
                },
            ],
        });
        service = TestBed.inject(SocketService);
        socketIOSpy = TestBed.inject(SOCKET_IO) as jasmine.Spy<typeof io>;
    });

    describe('createConnection()', () => {
        it('should call io with path and config', () => {
            service.createConnection('/orders');
            expect(socketIOSpy).toHaveBeenCalledWith('/orders', environment.wsConfig);
        });
    });

    describe('closeConnection()', () => {
        it('should call close() on given socket', () => {
            const socketSpy: jasmine.SpyObj<Socket> = jasmine.createSpyObj('Socket Spy', ['close']);
            service.closeConnection(socketSpy);
            expect(socketSpy.close).toHaveBeenCalled();
        });
    });
});
