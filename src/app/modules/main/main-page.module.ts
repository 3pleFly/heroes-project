import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module.ts';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule, MainPageRoutingModule ,SharedModule
  ]
})
export class MainPageModule { }
