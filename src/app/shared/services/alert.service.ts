import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _notification$: Subject<string | null> = new Subject<string | null>();
  messageStream: Observable<string | null> = this._notification$.asObservable();
  
  private _errors$: Subject<string | null> = new Subject<string | null>();
  errorStream: Observable<string | null> = this._errors$.asObservable();

  constructor() {}

  notify(message: string) {
    this._notification$.next(message);
    setTimeout(() => {
      this._notification$.next(null);
    }, 3000);
  }

  error(message: string) {
    this._errors$.next(message);
    setTimeout(() => {
      this._errors$.next(null);
    }, 3000);
  }
}
