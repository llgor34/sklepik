import { Response } from './response.interface';

export interface WorkersResponse extends Response {
  workers: Worker[];
}

export interface Worker {
  id: number;
  name: string;
  surname: string;
}
