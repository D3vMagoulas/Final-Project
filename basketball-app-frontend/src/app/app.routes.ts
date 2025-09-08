import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'auth/login', loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent) },

  { path: 'admin/login', loadComponent: () =>
      import('./features/auth/login/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },    

  { path: 'auth/signup', loadComponent: () =>
      import('./features/auth/signup/signup.component').then(m => m.SignupComponent) },

  { path: 'home', loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent) },

  { path: 'news', canActivate: [authGuard], loadComponent: () =>
      import('./features/news/news-list.component').then(m => m.NewsListComponent) },

  { path: 'roster/manage', canActivate: [adminGuard], loadComponent: () =>
      import('./features/roster/roster-admin.component').then(m => m.RosterAdminComponent) },
    
  { path: 'roster', canActivate: [authGuard], loadComponent: () =>
      import('./features/roster/roster-list.component').then(m => m.RosterListComponent) },

  { path: '**', redirectTo: '/home' }
];