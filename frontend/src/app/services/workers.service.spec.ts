import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkersService } from './workers.service';
import { testRequestType } from '../testing/generic.spec';
import { Response } from '../interfaces/response.interface';
import { Worker } from '../interfaces/worker.interface';

describe('WorkersService', () => {
    let service: WorkersService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WorkersService],
        });

        service = TestBed.inject(WorkersService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getWorkers$()', () => {
        const url = 'api/workers';

        it(`should GET request on "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getWorkers$(), httpController);
        });

        it('should return Worker[]', () => {
            const mockResponse: Response<Worker[]> = {
                ok: true,
                message: 'SUCCESS',
                data: [{ id: 1, name: 'adam', surname: 'williams' }],
            };

            service.getWorkers$().subscribe((workers) => {
                expect(workers).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
