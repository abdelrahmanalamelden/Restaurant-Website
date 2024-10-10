import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../styles/btn.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  isLoggedIn: boolean = false; // Initialize as false
  isMenuOpen = false;
  isAdmin: boolean = false; // Add isAdmin property
  private loggedInSubscription!: Subscription; // Use definite assignment assertion

  ngOnInit(): void {
    // Subscribe to loggedIn$ to get the current login status
    this.loggedInSubscription = this.authService.loggedIn$.subscribe(
      (loggedInStatus) => {
        this.isLoggedIn = loggedInStatus; // Update isLoggedIn on change
        this.isAdmin = this.authService.isAdmin();
        console.log('isAdmin', this.isAdmin);
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private router = inject(Router);
  logout(): void {
    this.authService.logout(); // Call logout method from AuthService
    this.isLoggedIn = false; // Update local state
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
