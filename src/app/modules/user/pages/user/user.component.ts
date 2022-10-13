import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Card } from 'src/app/shared/model/card.model';
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
    private heroesService: HeroesService,
    private authService: AuthService,
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
    card.power = card.power * powerMultiplier;
    const userCards = this.heroesService.getCurrentSession().userCards;
    console.log(this.heroesService.getCurrentSession());
    
  }
}
