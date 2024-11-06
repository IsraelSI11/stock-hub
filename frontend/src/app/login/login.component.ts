import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[ReactiveFormsModule]
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  error='';
  submitted = false;
  
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });

  constructor() {   }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // Handle the login logic (e.g., call an authentication service)
      console.log('Login successful', this.loginForm.value);
    } else {
      console.log(this.loginForm.get('password')!.hasError('minlength'));
      console.log(this.loginForm.get('password'));
      console.log('Form is invalid');
    }
  }

  clearError() {
    this.error = '';
  }
}
