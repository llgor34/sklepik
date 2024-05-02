import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css'],
})
export class NewRecordComponent<T> {
    records: T[] = [];

    @Output() recordCreate = new EventEmitter<T>();

    addRecord(element: T) {
        this.records.push(element);
    }

    protected onAddConfirmRecord(record: T, idx: number) {
        this.recordCreate.emit(record);
        this.onDeleteRecord(idx);
    }

    protected onDeleteRecord(idx: number) {
        this.records.splice(idx, 1);
    }
}
