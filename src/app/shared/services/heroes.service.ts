import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Card } from '../model/card.model';
import { AuthService } from './auth.service';
import { UserCardIdsResponseModel } from '../model/userCardIdsResponse.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})

//this service is singleton, and has a subscription, could this cause a memory leak?
// When is it preferable not to make the service a singleton, how do you do that?
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
    this.allCardsSubscription = this.requestCards().subscribe((allCards) => {
      this._allCards$.next(allCards);
    });
  }
  
  ngOnDestroy(): void {
    this.allCardsSubscription.unsubscribe();
  }

  postNewUserCardIds(userId: number): Observable<UserCardIdsResponseModel> {
    return this.http.post<UserCardIdsResponseModel>(
      `${environment.apiUrl}usercards`,
      {
        id: userId,
        cardIds: [],
      }
    );
  }

  putUserCardIds(
    cardIds: number[],
    userId: number
  ): Observable<UserCardIdsResponseModel> {
    return this.http.put<UserCardIdsResponseModel>(
      `${environment.apiUrl}usercards/${userId}`,
      { cardIds: cardIds }
    );
  }

  requestCards(): Observable<Card[]> {
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

  getUserCardIdsByUserId(userId: number): Observable<UserCardIdsResponseModel> {
    return this.http.get<UserCardIdsResponseModel>(
      `${environment.apiUrl}usercards/${userId}`
    );
  }

  findCardsByCardIds(cardIds: number[], cards: Card[]): Card[] {
    const matchingCards: Card[] = [];
    cardIds.forEach((id) => {
      cards.find((card) => {
        if (card.id === id) {
          matchingCards.push(card);
        }
      });
    });
    return matchingCards;
  }
}
