import { TestBed } from '@angular/core/testing';
import { NewRecordService } from './new-record.service';
import { Subscription } from 'rxjs';

describe('NewRecordService', () => {
    let service: NewRecordService<any>;
    const subscription = new Subscription();
    const testData = { id: 1, name: 'hello' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NewRecordService],
        });
        service = TestBed.inject(NewRecordService);
    });

    afterEach(() => {
        subscription.unsubscribe();
    });

    describe('records$', () => {
        it('should return empty array initially', () => {
            const sub = service.records$.subscribe((records) => expect(records).toEqual([]));

            subscription.add(sub);
        });

        it('should return array with one element', () => {
            service.addRecord(testData);

            const sub = service.records$.subscribe((records) => expect(records).toEqual([testData]));

            subscription.add(sub);
        });
    });

    describe('onRecordCreate$', () => {
        it('should emit event when record is submitted', () => {
            service.onRecordCreate$.subscribe((obj) => expect(obj).toEqual(testData));
            service.submitRecord(testData);
        });
    });

    describe('addRecord()', () => {
        it('should add item to the records$', () => {
            service.addRecord(testData);
            service.records$.subscribe((records) => expect(records).toEqual([testData]));
        });

        it('should not cause onRecordCreate$ emit', () => {
            service.onRecordCreate$.subscribe(() => fail());

            service.addRecord(testData);
        });
    });

    describe('deleteRecord()', () => {
        it('should delete item from the records$', () => {
            service.addRecord(testData);
            service.addRecord(testData);
            service.deleteRecordAtIdx(0);

            service.records$.subscribe((records) => expect(records.length).toEqual(1));
        });

        it('should not cause onRecordCreate$ emit', () => {
            service.onRecordCreate$.subscribe(() => fail());

            service.deleteRecordAtIdx(0);
        });
    });
});
