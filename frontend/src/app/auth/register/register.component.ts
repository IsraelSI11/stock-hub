import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { passwordMathValidator } from '../../shared/validators/passwordmatch.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService : AuthService = inject(AuthService);

  submitted = false;
  error = '';

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    passwordGroup: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]]
    },{validators : passwordMathValidator()})
  });

  constructor() { }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // Handle the login logic (e.g., call an authentication service)
      this.authService.register(this.registerForm.value.username!, this.registerForm.value.email!, this.registerForm.value.passwordGroup!.password!).subscribe(
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
