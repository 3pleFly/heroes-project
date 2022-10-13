import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isLoggedInSubscription!: Subscription;
  isLoggedIn: boolean = false;
  innerWidth!: number;

  constructor(private authService: AuthService) {}
  
  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe({next: (res) => this.isLoggedIn = res})
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  toggleBurger(burger: HTMLElement) {
    burger.classList.toggle('active');
  }

  logout(): void {
    this.authService.endSession();
  }


}
