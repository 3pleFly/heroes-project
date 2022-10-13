import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MustMatchValidator } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fbuilder: FormBuilder,
    private mustMatchValidator: MustMatchValidator,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.mustMatchValidator.passwordMatchValidator(),
      }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: User = {
        email: this.email?.value,
        password: this.password?.value,
      };
      this.authService.register(user).subscribe({
        next: (res) => {
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error(err.error);
        },
        complete: () => {},
      });
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
