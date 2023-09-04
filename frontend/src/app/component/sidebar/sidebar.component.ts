import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent {
  isOpen = true;

  constructor(public authService: AuthService) {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
