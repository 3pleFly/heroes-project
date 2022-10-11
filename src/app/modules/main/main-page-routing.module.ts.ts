import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutComponent } from 'src/app/shared/components/heroes-layout/heroes-layout.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'heroes', pathMatch: 'full' },
      { path: 'heroes', component: HeroesLayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
