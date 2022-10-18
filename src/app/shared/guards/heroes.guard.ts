import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isLoggedIn();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isLoggedIn();
  }
}
