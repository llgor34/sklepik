import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class NewRecordService<T> {
    private _records$ = new BehaviorSubject<T[]>([]);
    private _onRecordCreate$ = new Subject<T>();

    records$: Observable<T[]> = this._records$.asObservable();
    onRecordCreate$: Observable<T> = this._onRecordCreate$.asObservable();

    submitRecord(idx: number): void {
        const recordToSubmit = this.getRecordAtIdx(idx);
        this.emitSubmitEvent(recordToSubmit);
        this.deleteRecord(idx);
    }

    addRecord(item: T): void {
        this._records$.next([...this._records$.value, item]);
    }

    deleteRecord(idx: number): void {
        this._records$.next(this._records$.value.filter((record, recordIdx) => recordIdx !== idx));
    }

    private emitSubmitEvent(record: T) {
        this._onRecordCreate$.next(record);
    }

    private getRecordAtIdx(idx: number): T {
        return this._records$.value[idx];
    }
}
