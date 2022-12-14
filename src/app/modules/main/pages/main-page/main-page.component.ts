import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Card } from 'src/app/shared/model/card.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  allCards: Card[] | null = null;
  public boundOpenDialog = this.openHomeDialog.bind(this);
  public boundDialogAddHeroFn = this.dialogAddHeroFn.bind(this);
  allCards$Subscription!: Subscription;

  constructor(
    private heroesService: HeroesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    this.allCards$Subscription.unsubscribe();
  }

  ngOnInit(): void {    
    this.allCards$Subscription = this.heroesService.allCards$.subscribe((allCards) => {
      this.allCards = allCards;
    });
  }

  openHomeDialog(card: Card) {
    let data = { card };
    if (this.authService.isLoggedIn()) {
      Object.assign(data, { addHeroFn: this.boundDialogAddHeroFn });
    }
    this.dialog.open(DialogComponent, { data, autoFocus: false });
  }

  dialogAddHeroFn(cardId: number) {
    const userId: number | undefined = this.authService.getUserData().id;
    const userCards: Card[] | null =
      this.heroesService.getCurrentSession().userCards;
    if (userId && userCards) {
      if (
        this.heroesService
          .getCurrentSession()
          .userCards?.find((card) => card.id === cardId)
      ) {
        this.alertService.error('You already have the hero');
        return;
      }
      const newCard = this.heroesService
        .getCurrentSession()
        .allCards?.find((card) => card.id === cardId);
      if (newCard) {
        userCards.push(structuredClone(newCard));        
        this.heroesService.updateUserCards(userCards);
        this.heroesService.putUserCards(userId).subscribe();
        this.alertService.notify('New hero added');
      }
    }
  }
}
