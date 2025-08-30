// src/app/features/tickets/tickets-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { TicketsService, Fixture } from '../../shared/tickets.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone:true,
  selector:'app-tickets-list',
  imports:[NgFor, AsyncPipe],
  template: `
  <h2>Upcoming Fixtures</h2>
  <div class="grid">
    <div class="card" *ngFor="let f of fixtures$ | async">
      <div><strong>{{f.opponent}}</strong> — {{ f.date | date:'mediumDate' }}</div>
      <div>Venue: {{f.venue}}</div>
      <button (click)="buy(f.id)">Buy Tickets</button>
    </div>
  </div>
  `,
  styles:[`.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}.card{background:#151515;padding:1rem;border-radius:12px}.card button{margin-top:.5rem}`]
})
export class TicketsListComponent implements OnInit {
  private api = inject(TicketsService);
  private auth = inject(AuthService);
  private router = inject(Router);
  fixtures$ = this.api.list();

  ngOnInit(){ this.api.refresh(); }

  buy(id: number){
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/tickets/checkout/${id}` } });
      return;
    }
    this.router.navigate(['/tickets/checkout', id]);
  }
}
