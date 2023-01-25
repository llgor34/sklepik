import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      password: ['', Validators.required],
    });
  }

  get passwordControl() {
    return this.form.controls['password'];
  }

  formSubmit() {}
}
