import { Observable } from 'rxjs';
import { Response } from './response.interface';

export type UpdateFn = (id: number, obj: updateObj) => Observable<Response>;
export type updateObj = { [key: string]: any };
