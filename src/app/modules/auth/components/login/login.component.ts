import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/model/user.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  uiErrorMessage: string | null = null;
  errorMessageStreamSubscription!: Subscription;

  constructor(
    private fbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });

    this.errorMessageStreamSubscription =
      this.alertService.errorStream.subscribe((message) => {
        this.uiErrorMessage = message;
      });
  }

  ngOnDestroy(): void {
    this.errorMessageStreamSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: User = {
        email: this.email?.value,
        password: this.password?.value,
      };
      this.authService.login(user).subscribe({
        next: (res) => {
          this.alertService.notify('Login successful');
          this.router.navigate(['/myheroes']);
        },
        error: (err) => {
          console.log(err.error);
          this.alertService.error(err.error);
        },
        complete() {},
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }
}
