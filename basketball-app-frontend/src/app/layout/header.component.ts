import { Component, inject , HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, HamburgerMenuComponent],
})
export class HeaderComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  menuOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.closeMenu();
    }
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/auth/login'], { queryParams: { loggedOut: true } });
  }
}