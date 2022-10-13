import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroesLayoutComponent } from './components/heroes-layout/heroes-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    NavbarComponent,
    HeroesLayoutComponent,
    FooterComponent,
    SearchbarComponent,
    CardComponent,
    DialogComponent, 
  ],
  imports: [CommonModule, MatDialogModule, RouterModule, HttpClientModule],
  exports: [
    NavbarComponent,
    HeroesLayoutComponent,
    FooterComponent, 
  ],
})
export class SharedModule {}
