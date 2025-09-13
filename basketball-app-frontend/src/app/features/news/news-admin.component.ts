import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth/auth.service';
import { NewsService, NewsItem } from '../../shared/news.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewsFormComponent } from './news-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-admin',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSnackBarModule, NewsFormComponent],
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss']
})
export class NewsAdminComponent {
  private newsService = inject(NewsService);
  public auth = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  news$ = this.newsService.list();
  editing = signal<NewsItem | null>(null);

  constructor() {
    this.newsService.refresh();
  }

  addNew() {
    if (!this.auth.isAdmin()) return;
    this.editing.set({ id: 0, title: '', content: '', publishedAt: null });
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

  saved(formData: FormData) {
    let op: Observable<unknown>;
    const id = formData.get('id') as string | null;
    if (id) {
      op = this.newsService.update(+id, formData);
    } else {
      op = this.newsService.add(formData);

      
    }
    op.subscribe({
      next: () => {
        this.editing.set(null);
        this.newsService.refresh();
      },
      error: (err) => {
        console.error('Failed to save news item', err);
        this.snackBar.open('Failed to save news item', 'Dismiss', { duration: 3000 });
        this.editing.set(null);
      },
    });
  }

  cancel() {
    this.editing.set(null);
  }
}