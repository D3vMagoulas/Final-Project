// src/app/features/home/home.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
  <section class="hero">
    <div class="overlay">
      <h1>Welcome to the Club</h1>
      <p>Latest news, roster & tickets</p>
      <a routerLink="/tickets" class="cta">Buy Tickets</a>
    </div>
  </section>

  <section class="grid">
    <a routerLink="/news" class="card">Latest News</a>
    <a routerLink="/roster" class="card">Meet the Team</a>
    <a routerLink="/tickets" class="card">Fixtures & Tickets</a>
  </section>
  `,
  styles:[`
    .hero{height:48vh;background:url('/assets/hero.jpg') center/cover no-repeat;position:relative}
    .overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65));display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:1rem}
    .cta{margin-top:1rem;background:#4fc3f7;color:#111;padding:.6rem 1rem;border-radius:8px;text-decoration:none}
    .grid{max-width:1200px;margin:2rem auto;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));padding:0 1rem}
    .card{background:#151515;color:#fff;border:1px solid #222;border-radius:12px;padding:1.25rem;text-decoration:none}
  `]
})
export class HomeComponent {}
