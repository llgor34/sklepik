import { Observable } from 'rxjs';

export type GetFn<T> = () => Observable<T[]>;
