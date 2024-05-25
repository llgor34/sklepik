import { TestBed } from '@angular/core/testing';
import { ActivitiesEditableService } from './activities-editable.service';
import { ActivitiesService } from './activities.service';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

describe('ActivitiesEditableService', () => {
    let service: ActivitiesEditableService;
    let mockService: jasmine.SpyObj<ActivitiesService>;

    beforeEach(() => {
        prepareDependencies();
    });

    function prepareDependencies() {
        const spy = jasmine.createSpyObj('ActivitiesService', ['getActivities$']);

        TestBed.configureTestingModule({
            providers: [ActivitiesEditableService, { provide: ActivitiesService, useValue: spy }],
        });
        service = TestBed.inject(ActivitiesEditableService);
        mockService = TestBed.inject(ActivitiesService) as jasmine.SpyObj<ActivitiesService>;
    }

    function mockGetActivities$(returnValue?: Activity) {
        mockService.getActivities$.and.returnValue(
            new Observable((subscriber) => {
                subscriber.next([{ id: returnValue?.id ?? 0, name: returnValue?.name ?? 'a' }]);
                subscriber.complete();
            })
        );
    }

    describe('getActivitiesEditable$()', () => {
        it('should call ActivitiesService.getActivities$()', () => {
            mockGetActivities$();

            service.getActivitiesEditable$().subscribe();

            expect(mockService.getActivities$).toHaveBeenCalled();
        });

        it('should return Observable<EditableItem[]>', () => {
            const mockResponse: Activity = { id: 1, name: 'Hello World' };
            const mockExpectedResponse: EditableItem = { id: 1, label: 'Hello World' };

            mockGetActivities$(mockResponse);

            service
                .getActivitiesEditable$()
                .subscribe((activities) => expect(activities).toEqual([mockExpectedResponse]));
        });
    });
});
