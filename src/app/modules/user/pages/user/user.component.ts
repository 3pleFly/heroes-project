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

  constructor(private alertService: AlertService,
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
    card.power = Math.floor(card.power * powerMultiplier);
    this.heroesService.putCard(card).subscribe();
    this.alertService.notify("Trained " + card.name + "!");

  }
}
