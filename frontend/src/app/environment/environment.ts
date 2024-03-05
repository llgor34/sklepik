import { Environment } from '../interfaces/environment.interface';

export const environment: Environment = {
  wsAddress: 'ws://localhost:3000',
  wsConfig: {
    withCredentials: true,
  },
};
