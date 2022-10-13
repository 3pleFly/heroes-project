import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Card } from 'src/app/shared/model/card.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';

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
    private authService: AuthService, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.heroesService.userCards$.subscribe(
      (userCards) => (this.userCards = userCards)
    );
  }

  openUserDialog(card: Card) {
    this.dialog.open(DialogComponent, {data: {card, trainFn: this.boundDialogTrainButtonFn }});
  }

  dialogTrainButtonFn() {
    console.log('train -in user component');
    
  }
}
