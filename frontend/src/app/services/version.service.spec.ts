import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VersionService } from './version.service';
import { VersionResponse } from '../interfaces/version.interface';

describe('VersionService', () => {
    let service: VersionService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VersionService],
        });

        service = TestBed.inject(VersionService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getVersion$()', () => {
        const url = 'api/version';

        it(`should GET request "${url}"`, () => {
            service.getVersion$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return Version', () => {
            const mockResponse: VersionResponse = {
                ok: true,
                message: 'SUCCESS',
                version: {
                    features: ['feature 1', 'feature 2'],
                    number: '1.0.0',
                },
            };

            service.getVersion$().subscribe((version) => {
                expect(version).toEqual(mockResponse.version);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
