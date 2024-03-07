import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastr: ToastrService) {}

    showSuccess(message: string) {
        this.toastr.success(message, 'Sukces');
    }

    showWarning(message: string) {
        this.toastr.warning(message, 'Ostrzeżenie');
    }

    showError(message: string) {
        this.toastr.error(message, 'Błąd');
    }
}
