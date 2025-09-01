import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent), title: 'Home' },
  { path: 'news', loadComponent: () => import('./features/news/news-list.component').then(c => c.NewsListComponent), title: 'News' },
  { path: 'roster', loadComponent: () => import('./features/roster/roster-list.component').then(c => c.RosterListComponent), title: 'Roster' },

  { path: 'tickets', loadComponent: () => import('./features/tickets/tickets-list.component').then(c => c.TicketsListComponent), title: 'Tickets' },

  {
    path: 'tickets/checkout/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tickets/checkout/checkout.component').then(c => c.CheckoutComponent),
    title: 'Checkout'
  },

 {
  path: 'auth/login',
  loadComponent: () =>
    import('././features/auth/login/login/login.component').then(c => c.LoginComponent),
},
{
  path: 'auth/signup',
  loadComponent: () =>
    import('./features/auth/login/signup/signup.component').then(c => c.SignupComponent),
},

 

  { path: '**', redirectTo: '' }
];