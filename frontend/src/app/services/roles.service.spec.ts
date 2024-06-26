import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RolesService } from './roles.service';
import { testRequestType } from '../testing/generic.spec';
import { Response } from '../interfaces/response.interface';
import { Role } from '../interfaces/role.interface';

describe('RolesService', () => {
    let service: RolesService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RolesService],
        });

        service = TestBed.inject(RolesService);
        httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
    });

    describe('getRoles$()', () => {
        const url = 'api/roles';

        it(`should GET "${url}"`, () => {
            testRequestType(url, 'GET', () => service.getRoles$(), httpController);
        });

        it('should return Role[]', () => {
            const mockResponse: Response<Role[]> = {
                ok: true,
                message: 'SUCCESS',
                data: [{ id: 1, label: 'admin' }],
            };

            service.getRoles$().subscribe((roles) => {
                expect(roles).toEqual(mockResponse.data);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
