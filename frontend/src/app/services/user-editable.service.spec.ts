import { TestBed } from '@angular/core/testing';
import { UserEditableService } from './user-editable.service';
import { User } from '../interfaces/user.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { testRequestType, testReturnValueShouldEqual } from '../testing/generic.spec';
import { EditableItem } from '../interfaces/editable-item.interface';

describe('UserEditableService', () => {
    let service: UserEditableService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserEditableService],
        });
        service = TestBed.inject(UserEditableService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('getUsersEditable$()', () => {
        const mockData: User[] = [{ id: 1, name: 'Adam', surname: 'Smasher', password: '123321', roles: [] }];
        const expectedResult: EditableItem[] = [{ id: 1, label: 'Adam Smasher' }];
        const url = 'api/users';

        it(`should GET request on ${url}`, () => {
            testRequestType(url, 'GET', () => service.getUsersEditable$(), httpController);
        });

        it('should return EditableItem[]', () => {
            testReturnValueShouldEqual(
                url,
                mockData,
                expectedResult,
                () => service.getUsersEditable$(),
                httpController
            );
        });
    });
});
