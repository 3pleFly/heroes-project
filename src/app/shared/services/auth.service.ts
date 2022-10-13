import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { Router } from '@angular/router';
import { HeroesService } from './heroes.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private heroesService: HeroesService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.getUserData().id;
      if (userId) {
        this._isLoggedIn$.next(true);
        this.heroesService.updateUserCards(userId);
      } else {
        this._isLoggedIn$.next(false);
      }
    }
  }

  register(user: User) {
    return this.http
      .post<ResponseModel>(`${environment.apiUrl}register`, user, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          this.http
            .post(`${environment.apiUrl}usercards`, {
              id: res.user.id,
              cardIds: [],
            })
            .subscribe();
        })
      );
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  login(user: User) {
    return this.http
      .post<ResponseModel>(`${environment.apiUrl}login`, user, {
        headers: headers,
      })
      .pipe(
        tap((res: ResponseModel) => {
          this.createSession(res);
          return;
        })
      );
  }

  createSession(res: ResponseModel): void {
    localStorage.setItem('token', res.accessToken);
    localStorage.setItem('USER_DATA', JSON.stringify(res.user));
    this.setSession();
  }

  endSession(): void {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('USER_DATA');
    this.router.navigate(['/main/heroes']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserData(): User {
    const userData = localStorage.getItem('USER_DATA');
    if (userData !== null) {
      const userJson = JSON.parse(userData);
      const user = userJson as User;
      return user;
    }
    throw new Error('User ID is null.');
  }

  setSession() {
    const userData = localStorage.getItem('USER_DATA');
    if (userData !== null) {
      this._isLoggedIn$.next(true);
    } else {
      this._isLoggedIn$.next(false);
    }
  }
}
