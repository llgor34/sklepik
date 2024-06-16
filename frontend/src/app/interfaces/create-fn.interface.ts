import { Observable } from 'rxjs';
import { updateObj } from './update-fn.interface';

export type CreateFn = (item: updateObj) => Observable<number>;
