import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { NewsService, NewsItem } from '../../shared/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})

export class NewsListComponent implements OnInit {
  public auth = inject(AuthService);
  private newsService = inject(NewsService);
  public news: NewsItem[] = [];
  public expandedId: number | null = null;

  ngOnInit(): void {
    this.newsService.list().subscribe((items) => (this.news = items));
    this.newsService.refresh();
  }

  toggle(item: NewsItem): void {
    this.expandedId = this.expandedId === item.id ? null : item.id;
  }
}