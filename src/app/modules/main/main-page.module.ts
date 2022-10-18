import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MainPageRoutingModule } from './main-page-routing.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule, MainPageRoutingModule ,SharedModule, MatDialogModule
  ]
})
export class MainPageModule { }
