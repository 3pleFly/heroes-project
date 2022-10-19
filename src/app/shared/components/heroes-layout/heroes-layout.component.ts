import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../model/card.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss'],
})
export class HeroesLayoutComponent implements OnInit {
  @Input() cards!: Card[] | null;
  @Input() powerOrStartingPower!: boolean;
  @Input() dialogFunction!: any;

  constructor() {}

  ngOnInit(): void {    
  }

  openDialog(card: Card) {    
    this.dialogFunction(card);
  }

}
