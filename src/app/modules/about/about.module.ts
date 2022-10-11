import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AboutRoutingModule } from './about-routing.module.ts';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AboutPageComponent
  ],
  imports: [
    CommonModule, AboutRoutingModule, SharedModule
  ]
})
export class AboutModule { }
