import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { HeroesGuard } from './shared/guards/heroes.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main-page.module').then(
        (m) => m.MainPageModule
      ),
      canLoad: [HeroesGuard],
      canActivate: [HeroesGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
      ),
      canLoad: [AuthGuard],
      canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then(
        (m) => m.AboutModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then(
        (m) => m.UserModule
      ),
      canLoad: [HeroesGuard],
      canActivate: [HeroesGuard]
  },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
