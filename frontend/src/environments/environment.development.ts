import { Environment } from 'src/app/interfaces/environment.interface';

export const environment: Environment = {
    wsAddress: 'ws://localhost:3001',
    wsConfig: {
        withCredentials: true,
    },
};
