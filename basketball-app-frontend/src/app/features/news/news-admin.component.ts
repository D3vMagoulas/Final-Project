import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../core/auth/auth.service';
import { NewsService, NewsItem } from '../../shared/news.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-news-admin',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss']
})
export class NewsAdminComponent {
  private newsService = inject(NewsService);
  public auth = inject(AuthService);
  private dialog = inject(MatDialog);

  news$ = this.newsService.list();
  editing = signal<NewsItem | null>(null);

  constructor() {
    this.newsService.refresh();
  }

  addNew() {
    if (!this.auth.isAdmin()) return;
    this.editing.set({ id: 0, title: '', content: '', imageUrl: '', publishedAt: '' });
  }

  edit(news: NewsItem) {
    if (!this.auth.isAdmin()) return;
    this.editing.set({ ...news });
  }

  remove(news: NewsItem) {
    this.dialog
      .open(ConfirmDialogComponent, { data: { name: news.title } })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.newsService.remove(news.id).subscribe(() => this.newsService.refresh());
        }
      });
  }

  saved() {
    this.editing.set(null);
    this.newsService.refresh();
  }

  cancel() {
    this.editing.set(null);
  }
}