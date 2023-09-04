import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/interfaces/errorResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userNotExists = false;

  constructor(private authService: AuthService, private router: Router) {}

  formSubmit(form: NgForm) {
    const { password } = form.value;
    if (this.isEmpty(password)) return;

    this.login(password);
  }

  onPaste(event: ClipboardEvent) {
    const password = event.clipboardData?.getData('text') ?? '';
    if (this.isEmpty(password)) return;

    this.login(password);
  }

  login(password: string) {
    this.userNotExists = false;
    this.authService.login(password).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
      error: (error: ErrorResponse) => {
        switch (error.message) {
          case 'USER_NOT_FOUND':
            this.userNotExists = true;
            break;
        }
      },
    });
  }

  isEmpty(text: string) {
    return text?.trim().length === 0;
  }
}
