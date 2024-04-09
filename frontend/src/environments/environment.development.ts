import { Environment } from 'src/app/interfaces/environment.interface';

export const environment: Environment = {
    itemsPerPage: 20,
    wsAddress: 'ws://localhost:3001',
    wsConfig: {
        withCredentials: true,
    },
};
