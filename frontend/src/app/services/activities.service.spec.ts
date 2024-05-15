import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivitiesService } from './activities.service';
import { ActivityResponse } from '../interfaces/activity.interface';
import { testRequestType } from '../testing/generic.spec';

describe('ActivitiesService', () => {
    let service: ActivitiesService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ActivitiesService],
        });

        service = TestBed.inject(ActivitiesService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getActivities', () => {
        const url = 'api/activities';

        it(`should GET request on "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getActivities(), httpController);
        });

        it('should return Activity[] data', () => {
            const mockData: ActivityResponse = {
                ok: true,
                message: 'SUCCESS',
                activities: [{ id: 1, name: 'test' }],
            };

            service.getActivities().subscribe((activities) => {
                expect(activities).toEqual(mockData.activities);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockData);
        });
    });
});
