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
        <a routerLink="/news" routerLinkActive="active">Νέα</a>
        <a routerLink="/roster" routerLinkActive="active">Roster</a>
        <a routerLink="/tickets" routerLinkActive="active">Εισιτήρια</a>
      </nav>
      <div class="auth">
        <button *ngIf="!isAuthed()" routerLink="/login">Εγγραφή</button>
        <button *ngIf="!isAuthed()" routerLink="/auth/login">Σύνδεση</button>
        <button *ngIf="!isAuthed()" routerLink="/auth/signup">Εγγραφή</button>
        <button *ngIf="isAuthed()" (click)="logout()">
          Αποσύνδεση
          <img src="/assets/bg/logout.png" alt="Logout icon" class="logout-icon">
        </button>
      </div>
    </div>
  </header>
  `,

  styles: [`
    .nav { height: var(--navbar-height); display: flex; align-items: center; }
    .logout-button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 6px;
      color: #fff;
      font: inherit;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
    }
    .logout-button:hover {
      background-color: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.5);
    }
    .logout-button .logout-icon { height: 16px; }
  `],
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