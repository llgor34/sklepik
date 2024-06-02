import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
    testRequestType,
    testReturnValueShouldEqual,
    testReturnValueShouldEqualResponse,
} from '../testing/generic.spec';
import { User } from '../interfaces/user.interface';
import { Role } from '../interfaces/role.interface';

describe('UserService', () => {
    let service: UserService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(UserService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('getUsers$()', () => {
        const url = 'api/users';

        it(`should GET request on ${url}`, () => {
            testRequestType(url, 'GET', () => service.getUsers$(), httpController);
        });

        it('should return User[]', () => {
            const users: User[] = [{ id: 0, name: 'adam', surname: 'black', password: 'pass', roles: [] }];
            testReturnValueShouldEqual<User[]>(url, users, users, () => service.getUsers$(), httpController);
        });
    });

    describe('createUser$()', () => {
        const url = 'api/users';
        const user: User = { id: null, name: 'John', surname: 'Doe', password: 'pass', roles: [] };
        const userGeneratedId = 1;

        it(`should POST request on ${url}`, () => {
            testRequestType(url, 'POST', () => service.createUser$(user), httpController);
        });

        it('should return number', () => {
            testReturnValueShouldEqual<number>(
                url,
                userGeneratedId,
                userGeneratedId,
                () => service.createUser$(user),
                httpController
            );
        });
    });

    describe('deleteUser$()', () => {
        const userId = 1;
        const url = `api/users/${userId}`;

        it(`should DELETE request on ${url}`, () => {
            testRequestType(url, 'DELETE', () => service.deleteUser$(userId), httpController);
        });

        it('should return response', () => {
            testReturnValueShouldEqualResponse(url, () => service.deleteUser$(userId), httpController);
        });
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

    describe('updateUserData()', () => {
        const userId = 1;
        const url = `api/users/${userId}`;
        const fieldData: Partial<User> = { name: 'adam' };

        it(`should PUT request on ${url}`, () => {
            testRequestType(url, 'PUT', () => service.updateUserData$(userId, fieldData), httpController);
        });

        it('should return response', () => {
            testReturnValueShouldEqualResponse(url, () => service.updateUserData$(userId, fieldData), httpController);
        });
    });
});
