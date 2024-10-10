import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-mcard',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './mcard.component.html',
  styleUrl: './mcard.component.css',
})
export class MCardComponent {
  private authService = inject(AuthService);
  isAdmin: boolean = false;
  private loggedInSubscription!: Subscription;
  ngOnInit(): void {
    // Subscribe to loggedIn$ to get the current login status
    this.loggedInSubscription = this.authService.loggedIn$.subscribe(
      (loggedInStatus) => {
        this.isAdmin = this.authService.isAdmin();
        console.log('isAdmin', this.isAdmin);
      }
    );
  }
  @Input() category?: string;
  @Input() src?: string;
  @Input() description?: string;
  @Input() price?: string;
  @Input() id?: string;
  @Input() onDel1!: (id: string) => void;
  @Input() onEdit1!: (id: string) => void;

  onDel() {
    this.onDel1(String(this.id));
  }

  onEdit() {
    this.onEdit1(String(this.id));
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
