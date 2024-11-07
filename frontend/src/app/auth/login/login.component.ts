import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService : AuthService = inject(AuthService);

  submitted = false;
  error = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });

  constructor() { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // Handle the login logic (e.g., call an authentication service)
      this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(
        {
          next: (res: any) => {
            this.clearError();
            console.log('Response:', res);
          },
          error: (error: any) => {
            console.error('Error:', error);
            this.error = error.message ?? '';
          }
        }
      )
    }
  }

  clearSubmitted() {
    this.submitted = false;
  }
  
  clearError() {
    this.error = '';
  }
}
