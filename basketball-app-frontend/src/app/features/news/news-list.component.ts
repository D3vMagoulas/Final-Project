// src/app/features/news/news-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { NewsService, NewsItem } from '../../shared/news.service';

@Component({
  standalone: true,
  selector: 'app-news-list',
  imports:[NgForOf, AsyncPipe],
  template: `
  <h2>News</h2>
  <div class="list">
    <article *ngFor="let n of news$ | async" class="card">
      <h3>{{n.title}}</h3>
      <p>{{n.summary}}</p>
    </article>
  </div>
  `,
  styles:[`.list{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}.card{background:#151515;padding:1rem;border-radius:12px}`]
})
export class NewsListComponent implements OnInit {
  private api = inject(NewsService);
  news$ = this.api.list();
  ngOnInit(){ this.api.refresh(); }
}
