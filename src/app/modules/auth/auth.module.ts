import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './components/auth-page.component';
import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, AuthPageRoutingModule,SharedModule],
})
export class AuthModule {}
