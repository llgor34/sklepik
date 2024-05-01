import { Observable } from 'rxjs';
import { Response } from './response.interface';

export type DeleteFn = (id: number) => Observable<Response>;
