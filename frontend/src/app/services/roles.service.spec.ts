import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RolesService } from './roles.service';
import { RoleResponse } from '../interfaces/role.interface';

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
            service.getRoles$().subscribe();

            const testRequest = httpController.expectOne(url);

            expect(testRequest.request.method).toEqual('GET');
        });

        it('should return Role[]', () => {
            const mockResponse: RoleResponse = {
                ok: true,
                message: 'SUCCESS',
                roles: [{ id: 1, label: 'admin' }],
            };

            service.getRoles$().subscribe((roles) => {
                expect(roles).toEqual(mockResponse.roles);
            });

            const testRequest = httpController.expectOne(url);
            testRequest.flush(mockResponse);
        });
    });
});
