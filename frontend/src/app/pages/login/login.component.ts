import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      password: ['', Validators.required],
    });
  }

  get passwordControl() {
    return this.form.controls['password'];
  }

  formSubmit() {
    this.authService.login(this.passwordControl.value).subscribe((res) => {
      console.log(res);
    });
  }
}
