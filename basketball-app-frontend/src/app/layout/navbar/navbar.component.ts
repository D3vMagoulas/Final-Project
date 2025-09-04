import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
  <header class="nav">
    <div class="nav-inner">
      <a routerLink="/" class="logo">Basketball</a>
      <nav>
        <a routerLink="/news" routerLinkActive="active">News</a>
        <a routerLink="/roster" routerLinkActive="active">Roster</a>
        <a routerLink="/tickets" routerLinkActive="active">Tickets</a>
      </nav>
      <div class="auth">
        <button *ngIf="!isAuthed()" routerLink="/login">Εγγραφή</button>
        <button *ngIf="!isAuthed()" routerLink="/auth/login">Σύνδεση</button>
        <button *ngIf="!isAuthed()" routerLink="/auth/signup">Εγγραφή</button>
        <button *ngIf="isAuthed()" (click)="logout()">Αποσύνδεση</button>
      </div>
    </div>
  </header>
  `,

})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  isAuthed = signal(this.auth.isLoggedIn());

  logout(){
    this.auth.logout();
    this.isAuthed.set(false);
    this.router.navigateByUrl('/');
  }
}