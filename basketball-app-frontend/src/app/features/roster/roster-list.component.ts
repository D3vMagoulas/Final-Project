// src/app/features/roster/roster-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RosterService, Player } from '../../shared/roster.service';

@Component({
  standalone:true,
  selector:'app-roster-list',
  imports:[NgForOf, AsyncPipe],
  template: `
  <h2>Roster</h2>
  <div class="grid">
    <div *ngFor="let p of players$ | async" class="card">
      <strong>#{{p.number}} {{p.name}}</strong>
      <div>{{p.position}}</div>
    </div>
  </div>
  `,
  styles:[`.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.card{background:#151515;padding:1rem;border-radius:12px}`]
})
export class RosterListComponent implements OnInit {
  private api = inject(RosterService);
  players$ = this.api.list();
  ngOnInit(){ this.api.refresh(); }
}
