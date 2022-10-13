import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { HeroesService } from './shared/services/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  notification: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    // const userId = this.authService.getUserData().id;
    // if (userId) {
    //   this.heroesService.updateUserCards(userId);
    // }
  }
}
