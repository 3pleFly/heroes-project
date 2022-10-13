import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  trainFn!: Function;
  addHeroFn!: Function;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.trainFn = this.data.trainFn;
    this.addHeroFn = this.data.addHeroFn;
  }

  train(): void {
    this.trainFn();
  }

  addHero(): void {
    this.addHeroFn(this.data.card.id);
  }
}
