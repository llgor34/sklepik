import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivitiesService } from './activities.service';
import { ActivityCreateForm, ActivityResponse } from '../interfaces/activity.interface';
import { Response } from '../interfaces/response.interface';

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

    describe('#getActivities', () => {
        it('should GET request on "api/activities/get"', () => {
            service.getActivities().subscribe();

            const testRequest = httpController.expectOne('api/activities/get');

            expect(testRequest.request.method).toEqual('GET');
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

            const testRequest = httpController.expectOne('api/activities/get');
            testRequest.flush(mockData);
        });
    });

    describe('#createActivity', () => {
        const mockData: ActivityCreateForm = {
            activityId: 1,
            amount: 1,
            date: '2020-01-01',
            description: 'some description',
            workerId: 1,
        };
        const mockResponse: Response = { ok: true, message: 'SUCCESS' };

        it('should POST request on "api/activities/create"', () => {
            service.createActivity(mockData).subscribe();

            const testRequest = httpController.expectOne('api/activities/create');

            expect(testRequest.request.method).toEqual('POST');
        });

        it('should return Response data', () => {
            service.createActivity(mockData).subscribe((res) => {
                expect(res).toEqual(mockResponse);
            });

            const testRequest = httpController.expectOne('api/activities/create');
            testRequest.flush(mockResponse);
        });
    });
});
