import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Card } from 'src/app/shared/model/card.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  allCards!: Card[];
  public boundOpenDialog = this.openHomeDialog.bind(this);
  public boundDialogAddHeroFn = this.dialogAddHeroFn.bind(this);

  constructor(
    private heroesService: HeroesService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.heroesService.getCards().subscribe((allCards) => {
      this.allCards = allCards;
    });
  }

  openHomeDialog(card: Card) {
    if (this.authService.isLoggedIn()) {
      this.dialog.open(DialogComponent, {
        data: { card, addHeroFn: this.boundDialogAddHeroFn },
      });
    } else {
      this.dialog.open(DialogComponent, {
        data: { card },
      });
    }
  }

  dialogAddHeroFn(cardId: number) {
    const userId = this.authService.getUserData().id;
    if (userId) {
      this.heroesService
        .getUserCardIdsByUserId(userId)
        .subscribe((userCardIds) => {
          const foundCardIds: number | undefined = userCardIds.cardIds.find(
            (myCardId) => myCardId === cardId
          );        
          if (!foundCardIds) {
            userCardIds.cardIds.push(cardId);
            this.heroesService.addHero(userCardIds.cardIds, userId).subscribe();
            //log success
            this.heroesService.updateUserCards(userId);
            this.dialog.closeAll();
          } else {
            //log user already has hero
          }
        });
    }
  }
}
