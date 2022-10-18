import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MustMatchValidator } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fbuilder: FormBuilder,
    private mustMatchValidator: MustMatchValidator,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
            Validators.pattern('^(?=.*\\d)(?=.*\\W+)(?=.*[a-z])(?=.*[A-Z]).*$'),
          ],
        ],
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
          this.alertService.notify('Registration successful');
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
