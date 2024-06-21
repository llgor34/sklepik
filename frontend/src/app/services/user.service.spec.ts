import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { testRequestType, testReturnValueShouldEqualResponse } from '../testing/generic.spec';
import { Role } from '../interfaces/role.interface';
import { providePanelServiceEndpoint } from '../constants/endpoint.constant';

describe('UserService', () => {
    let service: UserService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [providePanelServiceEndpoint('api/users')],
        });

        service = TestBed.inject(UserService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('updateUserRoles$()', () => {
        const userId = 1;
        const modifiedRoles: Role[] = [{ id: 1, label: 'admin' }];
        const url = `api/users/${userId}/update-roles`;

        it(`should PUT request on ${url}`, () => {
            testRequestType(url, 'PUT', () => service.updateUserRoles$(userId, modifiedRoles), httpController);
        });

        it('should return response', () => {
            testReturnValueShouldEqualResponse(
                url,
                () => service.updateUserRoles$(userId, modifiedRoles),
                httpController
            );
        });
    });
});
