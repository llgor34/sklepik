import { Environment } from 'src/app/interfaces/environment.interface';

export const environment: Environment = {
    apiAddress: 'http://192.168.0.1:3000',
    wsAddress: 'ws://192.168.0.1:3001',
    wsConfig: {
        withCredentials: true,
    },
};
