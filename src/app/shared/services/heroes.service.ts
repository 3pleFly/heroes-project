import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Card } from '../model/card.model';
import UserCardsResponse from '../model/userCardsResponse.model';

@Injectable({
  providedIn: 'root',
})


export class HeroesService implements OnDestroy {
  private _allCards$: BehaviorSubject<Card[] | null> = new BehaviorSubject<
    Card[] | null
  >(null);
  private _userCards$: BehaviorSubject<Card[] | null> = new BehaviorSubject<
    Card[] | null
  >(null);
  allCards$: Observable<Card[] | null> = this._allCards$.asObservable();
  userCards$: Observable<Card[] | null> = this._userCards$.asObservable();

  allCardsSubscription!: Subscription;

  constructor(private http: HttpClient) {
    this.allCardsSubscription = this.getAllCards().subscribe((allCards) => {
      this._allCards$.next(allCards);
    });
  }

  ngOnDestroy(): void {
    this.allCardsSubscription.unsubscribe();
  }

  createUserCards(userId: number): Observable<UserCardsResponse> {
    return this.http.post<UserCardsResponse>(`${environment.apiUrl}usercards`, {
      id: userId,
      cards: [],
    });
  }

  putUserCards(userId: number): Observable<UserCardsResponse> {
    return this.http.put<UserCardsResponse>(
      `${environment.apiUrl}usercards/${userId}`,
      { cards: this._userCards$.getValue() }
    );
  }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}cards`);
  }

  updateUserCards(userCards: Card[]): void {
    this._userCards$.next(userCards);
  }

  putCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${environment.apiUrl}cards/${card.id}`, card);
  }

  getCurrentSession() {
    return {
      userCards: this._userCards$.getValue(),
      allCards: this._allCards$.getValue(),
    };
  }

  getUserCardsByUserId(userId: number): Observable<UserCardsResponse> {
    return this.http.get<UserCardsResponse>(
      `${environment.apiUrl}usercards/${userId}`
    );
  }

}
