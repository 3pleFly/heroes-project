import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  uiErrorMessage: string | null = null;

  trainFn!: Function;
  addHeroFn!: Function;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {}
  errorMessageStreamSubscription!: Subscription;

  ngOnInit(): void {
    this.trainFn = this.data.trainFn;
    this.addHeroFn = this.data.addHeroFn;
    this.errorMessageStreamSubscription =
      this.alertService.errorStream.subscribe((message) => {
        this.uiErrorMessage = message;
      });
  }

  ngOnDestroy(): void {
    this.errorMessageStreamSubscription.unsubscribe();    
  }

  train(): void {
    this.trainFn(this.data.card);
  }

  addHero(): void {
    this.addHeroFn(this.data.card.id);
  }
}
