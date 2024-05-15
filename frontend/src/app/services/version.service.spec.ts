import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VersionService } from './version.service';
import { testRequestType } from '../testing/generic.spec';
import { Response } from '../interfaces/response.interface';
import { Version } from '../interfaces/version.interface';

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
            testRequestType(url, 'GET', () => service.getVersion$(), httpController);
        });

        it('should return Version', () => {
            const mockResponse: Response<Version> = {
                ok: true,
                message: 'SUCCESS',
                data: {
                    features: ['feature 1', 'feature 2'],
                    number: '1.0.0',
                },
            };

            service.getVersion$().subscribe((version) => {
                expect(version).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
