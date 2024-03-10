import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(public authService: AuthService, private toastService: ToastService) {}
}
