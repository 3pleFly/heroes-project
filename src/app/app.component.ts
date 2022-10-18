import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './shared/services/alert.service';
import { AuthService } from './shared/services/auth.service';
import { HeroesService } from './shared/services/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  notification: string | null = '';
  messageStreamSubscription!: Subscription;

  constructor(private alertService: AlertService) {}
  
  ngOnDestroy(): void {
    this.messageStreamSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.messageStreamSubscription = this.alertService.messageStream.subscribe(
      (message) => (this.notification = message)
    );
  }
}
