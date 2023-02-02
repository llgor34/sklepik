import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ErrorResponse } from 'src/app/interfaces/errorResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isPasswordInvalid = false;
  isUsernameInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  formSubmit(form: NgForm) {
    const { username, password } = form.value;
    if (username.trim().length === 0 || password.trim().length === 0) return;

    this.isPasswordInvalid = false;
    this.isUsernameInvalid = false;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
      error: (error: ErrorResponse) => {
        form.reset();

        switch (error.message) {
          case 'PASSWORD_INVALID':
            this.isPasswordInvalid = true;
            break;

          case 'USERNAME_NOT_PROVIDED':
          case 'USER_NOT_FOUND':
            this.isUsernameInvalid = true;
            break;
        }
      },
    });
  }
}
