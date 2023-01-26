import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
})
export class SellComponent {
  constructor(private authService: AuthService) {}

  get userFullname() {
    return `${this.authService.user!.name} ${this.authService.user!.surname}`;
  }

  get roles() {
    return this.authService.user!.role;
  }
}
