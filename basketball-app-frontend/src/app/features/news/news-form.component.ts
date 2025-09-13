import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { NewsService, NewsItem } from '../../shared/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private newsService = inject(NewsService);
  public auth = inject(AuthService);

  @Input() news: NewsItem | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    id: [0],
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    imageUrl: [''],
    publishedAt: ['']
  });

  ngOnChanges() {
    if (this.news) {
      this.form.patchValue(this.news);
    } else {
      this.form.reset({
        id: 0,
        title: '',
        content: '',
        imageUrl: '',
        publishedAt: ''
      });
    }
  }

  submit() {
    if (!this.auth.isAdmin() || this.form.invalid) return;
    const value = this.form.value as NewsItem;
    let request;
    if (value.id) {
      request = this.newsService.update(value);
    } else {
      const { id, ...payload } = value;
      request = this.newsService.add(payload);
    }
    request.subscribe(() => this.saved.emit());
  }
}