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
        <button *ngIf="!isAuthed()" routerLink="/login">Sign in</button>
        <button *ngIf="isAuthed()" (click)="logout()">Logout</button>
      </div>
    </div>
  </header>
  `,
  styles: [`
    .nav{position:sticky;top:0;z-index:10;background:#111;color:#fff}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;padding:0.75rem 1rem}
    .logo{font-weight:700;letter-spacing:.5px;text-decoration:none;color:#fff}
    nav a{margin:0 .75rem;color:#fff;text-decoration:none;opacity:.9}
    nav a.active{border-bottom:2px solid #4fc3f7}
    .auth button{background:#4fc3f7;border:0;color:#111;padding:.4rem .75rem;border-radius:6px;cursor:pointer}
  `]
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
