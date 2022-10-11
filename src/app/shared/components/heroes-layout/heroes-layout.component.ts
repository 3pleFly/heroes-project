import { Component, OnInit } from '@angular/core';
import { Card } from '../../model/card.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss'],
})
export class HeroesLayoutComponent implements OnInit {
  cards: Card[] = [
    {
      id: 1,
      ability: 'Attacker',
      imgSrc:
        'https://images.pexels.com/photos/4048093/pexels-photo-4048093.jpeg?auto=compress&cs=tinysrgb&w=1600',
      name: 'First',
      power: 990,
      startingPower: 100,
      trainStartDate: new Date(),
    },
    {
      id: 2,
      ability:
        'https://images.pexels.com/photos/4048093/pexels-photo-4048093.jpeg?auto=compress&cs=tinysrgb&w=1600',
      imgSrc: '',
      name: 'Second',
      power: 990,
      startingPower: 100,
      trainStartDate: new Date(),
    },
  ];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { card },
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => console.log('Dialog result:', result));
  }
}
