import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Card } from 'src/app/shared/model/card.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userCards!: Card[] | null;
  public boundMainDialog = this.openUserDialog.bind(this);
  public boundDialogTrainButtonFn = this.dialogTrainButtonFn.bind(this);

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private heroesService: HeroesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.heroesService.userCards$.subscribe(
      (userCards) => (this.userCards = userCards)
    );
  }

  openUserDialog(card: Card) {
    let data = { card, trainFn: this.boundDialogTrainButtonFn };
    this.dialog.open(DialogComponent, { data, autoFocus: false });
  }

  dialogTrainButtonFn(card: Card) {
    const powerMultiplier =
      Math.random() *
        (environment.maxPowerUpgrade - environment.minPowerUpgrade) +
      environment.minPowerUpgrade;

    if (card.trainCount < 5) {
      card.power = Math.floor(card.power * powerMultiplier);
      if (card.trainCount === 4) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 1);
        card.nextTrainDate = nextDate;
      }

      card.trainCount++;
      const userId = this.authService.getUserData().id;
      if (userId) {
        this.heroesService.putUserCards(userId).subscribe();
      }
      this.alertService.notify('Trained ' + card.name + '!');
    } else {
      this.alertService.error(card.name + ' is too tired to train');
    }
  }
}
