import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NewRecordService } from 'src/app/services/new-record.service';

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css'],
})
export class NewRecordComponent<T> {
    newRecordService: NewRecordService<T> = inject(NewRecordService);
    records$ = this.newRecordService.records$;

    submitRecord(idx: number) {
        this.newRecordService.submitRecord(idx);
    }

    deleteRecord(idx: number) {
        this.newRecordService.deleteRecord(idx);
    }
}
