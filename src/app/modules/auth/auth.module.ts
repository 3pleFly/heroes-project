import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthNavbarComponent,
    AuthPageComponent,
  ],
  imports: [CommonModule, AuthPageRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
