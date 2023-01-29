import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isPasswordInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  formSubmit(form: NgForm) {
    this.authService.login(form.value.password).subscribe({
      next: () => {
        this.isPasswordInvalid = false;
        this.router.navigate(['/main']);
      },
      error: () => {
        form.reset();
        this.isPasswordInvalid = true;
      },
    });
  }
}
