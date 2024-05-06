import { Observable } from 'rxjs';

export type CreateFn<T> = (item: T) => Observable<number>;
