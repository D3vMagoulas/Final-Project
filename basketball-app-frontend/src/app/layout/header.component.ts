import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  menuOpen = false;

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  logout() {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/auth/login'], { queryParams: { loggedOut: true } });
  }
}