import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { io } from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(public authService: AuthService, private toastService: ToastService) {}
}
