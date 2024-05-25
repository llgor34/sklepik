import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
    let service: ToastService;
    let toastrSpyService: jasmine.SpyObj<ToastrService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('ToastrService', ['success', 'warning', 'error']);

        TestBed.configureTestingModule({
            providers: [ToastService, { provide: ToastrService, useValue: spy }],
        });

        service = TestBed.inject(ToastService);
        toastrSpyService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    });

    describe('showSuccess', () => {
        it('should call ToastrService.success() once', () => {
            service.showSuccess('test');
            expect(toastrSpyService.success).toHaveBeenCalled();
        });

        it('should call ToastrService.warning() once', () => {
            service.showWarning('test');
            expect(toastrSpyService.warning).toHaveBeenCalled();
        });

        it('should call ToastrService.error() once', () => {
            service.showError('test');
            expect(toastrSpyService.error).toHaveBeenCalled();
        });
    });
});
