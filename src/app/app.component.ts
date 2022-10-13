import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/services/alert.service';
import { AuthService } from './shared/services/auth.service';
import { HeroesService } from './shared/services/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  notification: string | null = '';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.messageStream.subscribe(
      (message) => (this.notification = message)
    );
  }
}
