import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivitiesService } from './activities.service';
import { testRequestType } from '../testing/generic.spec';
import { Response } from '../interfaces/response.interface';
import { Activity } from '../interfaces/activity.interface';

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
            testRequestType(url, 'GET', () => service.getActivities$(), httpController);
        });

        it('should return Activity[] data', () => {
            const mockData: Response<Activity[]> = {
                ok: true,
                message: 'SUCCESS',
                data: [{ id: 1, name: 'test' }],
            };

            service.getActivities$().subscribe((activities) => {
                expect(activities).toEqual(mockData.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockData);
        });
    });
});
