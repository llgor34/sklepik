import { Environment } from 'src/app/interfaces/environment.interface';

export const environment: Environment = {
    itemsPerPage: 20,
    wsAddress: 'ws://192.168.0.1:3001',
    wsConfig: {
        withCredentials: true,
    },
};
