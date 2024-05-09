import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkersService } from './workers.service';
import { WorkersResponse } from '../interfaces/worker.interface';
import { OwedDiscountResponse } from '../interfaces/owed-discount.interface';
import { UsedDiscountResponse } from '../interfaces/used-discount.interface';
import { WorkedHoursResponse } from '../interfaces/worked-hours.interface';

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
        const url = 'api/workers/get';

        it(`should GET request on "${url}"`, () => {
            service.getWorkers$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return Worker[]', () => {
            const mockResponse: WorkersResponse = {
                ok: true,
                message: 'SUCCESS',
                workers: [{ id: 1, name: 'adam', surname: 'williams' }],
            };

            service.getWorkers$().subscribe((workers) => {
                expect(workers).toEqual(mockResponse.workers);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('getWorkerOwedDiscount$()', () => {
        const url = 'api/workers/get-owed-discount-by-id';

        it(`should GET request on "${url}"`, () => {
            service.getWorkerOwedDiscount$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return number', () => {
            const mockResponse: OwedDiscountResponse = {
                ok: true,
                message: 'SUCCESS',
                owedDiscount: 100,
            };

            service.getWorkerOwedDiscount$().subscribe((owedDiscount) => {
                expect(owedDiscount).toEqual(mockResponse.owedDiscount);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('getWorkerUsedDiscount$()', () => {
        const url = 'api/workers/get-used-discount-by-id';

        it(`should GET request on "${url}"`, () => {
            service.getWorkerUsedDiscount$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return number', () => {
            const mockResponse: UsedDiscountResponse = {
                ok: true,
                message: 'SUCCESS',
                usedDiscount: 100,
            };

            service.getWorkerUsedDiscount$().subscribe((usedDiscount) => {
                expect(usedDiscount).toEqual(mockResponse.usedDiscount);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });

    describe('getWorkerWorkedHours$()', () => {
        const url = 'api/workers/get-worked-hours';

        it(`should GET request on "${url}"`, () => {
            service.getWorkerWorkedHours$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return number', () => {
            const mockResponse: WorkedHoursResponse = {
                ok: true,
                message: 'SUCCESS',
                workedHoursAmount: 100,
            };

            service.getWorkerWorkedHours$().subscribe((workedHours) => {
                expect(workedHours).toEqual(mockResponse.workedHoursAmount);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
