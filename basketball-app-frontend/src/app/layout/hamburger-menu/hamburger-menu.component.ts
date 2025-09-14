import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
  imports: [RouterLink, CommonModule],
})
export class HamburgerMenuComponent {
  menuOpen = false;

  routes = [
    { path: '/home', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/roster', label: 'Roster' },
    { path: '/tickets', label: 'Tickets' },
    { path: '/auth/login', label: 'Login' },
    { path: '/auth/signup', label: 'Sign Up' },
  ];

  constructor(private elementRef: ElementRef, private auth: AuthService) {}

  get visibleRoutes() {
    if (this.auth.isLoggedIn()) {
      return this.routes.filter(
        route => route.path !== '/auth/login' && route.path !== '/auth/signup'
      );
    }
    return this.routes;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }
}