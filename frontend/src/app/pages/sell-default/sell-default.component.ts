import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sell-default',
  templateUrl: './sell-default.component.html',
})
export class SellDefaultComponent {
  constructor(public authService: AuthService) {}
}
