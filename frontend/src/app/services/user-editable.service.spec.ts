import { TestBed } from '@angular/core/testing';
import { UserEditableService } from './user-editable.service';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { of } from 'rxjs';

describe('UserEditableService', () => {
    let service: UserEditableService;
    let userServiceMock: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEditableService,
                {
                    provide: UserService,
                    useValue: jasmine.createSpyObj('UserService', ['getUsers$']),
                },
            ],
        });
        service = TestBed.inject(UserEditableService);
        userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    });

    describe('getUsersEditable$()', () => {
        const mockData: User[] = [{ id: 1, name: 'Adam', surname: 'Smasher', password: '123321', roles: [] }];

        it('should call userService.getUsers$()', () => {
            userServiceMock.getUsers$.and.returnValue(of(mockData));

            service.getUsersEditable$().subscribe();

            expect(userServiceMock.getUsers$).toHaveBeenCalled();
        });

        it('should return EditableItem[]', () => {
            userServiceMock.getUsers$.and.returnValue(of(mockData));

            service
                .getUsersEditable$()
                .subscribe((editableItem) => expect(editableItem).toEqual([{ id: 1, label: 'Adam Smasher' }]));
        });
    });
});
