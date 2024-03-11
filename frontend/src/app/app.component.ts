import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    protected sidebarEnabled = true;

    constructor(public authService: AuthService, private toastService: ToastService) {}

    enableSidebar() {
        this.sidebarEnabled = true;
    }

    disableSidebar() {
        this.sidebarEnabled = false;
    }
}
