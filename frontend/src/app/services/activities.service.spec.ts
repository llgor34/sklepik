import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivitiesService } from './activities.service';
import { ActivityCreateForm, ActivityResponse } from '../interfaces/activity.interface';
import { Response } from '../interfaces/response.interface';
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
        const url = 'api/activities/get';

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

    describe('createActivity', () => {
        const url = 'api/activities/create';
        let mockData: ActivityCreateForm;

        beforeEach(() => {
            mockData = {
                activityId: 1,
                amount: 1,
                date: '2020-01-01',
                description: 'some description',
                workerId: 1,
            };
        });

        it(`should POST request on "${url}"`, () => {
            testRequestType(url, 'POST', () => service.createActivity(mockData), httpController);
        });

        it('should return Response data', () => {
            const mockResponse: Response = { ok: true, message: 'SUCCESS' };

            service.createActivity(mockData).subscribe((res) => {
                expect(res).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
