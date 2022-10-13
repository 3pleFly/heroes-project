import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Card } from '../model/card.model';
import { AuthService } from './auth.service';
import { UserCardIdsResponseModel } from '../model/userCardIdsResponse.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})

//this service is singleton, and has a subscription, could this cause a memory leak?
// When is it preferable not to make the service a singleton, how do you do that?
export class HeroesService {
  private _allCards$: Subject<Card[]> = new Subject<Card[]>();
  private _userCards$: BehaviorSubject<Card[] | null> = new BehaviorSubject<
    Card[] | null
  >(null);
  allCards$: Observable<Card[]> = this._allCards$.asObservable();
  userCards$: Observable<Card[] | null> = this._userCards$.asObservable();

  constructor(private http: HttpClient) {
    this.getCards().subscribe((allCards) => {
      this._allCards$.next(allCards);
    });
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}cards`);
  }

  updateUserCards(userId: number): void {
    this.getCards().subscribe((allCards) => {
      this.getUserCardIdsByUserId(userId).subscribe((userCardIds) => {
        const cards: Card[] = this.findCardsByCardIds(
          userCardIds.cardIds,
          allCards
        );
        this._userCards$.next(cards);
      });
    });
  }

  addHero(
    cardIds: number[],
    userId: number
  ): Observable<UserCardIdsResponseModel> {
    return this.http.put<UserCardIdsResponseModel>(
      `${environment.apiUrl}usercards/${userId}`,
      {
        cardIds: cardIds,
      }
    );
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