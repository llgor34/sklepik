import { Environment } from 'src/app/interfaces/environment.interface';

export const environment: Environment = {
    apiAddress: 'http://localhost:3000',
    wsAddress: 'ws://localhost:3001',
    wsConfig: {
        withCredentials: true,
    },
};
