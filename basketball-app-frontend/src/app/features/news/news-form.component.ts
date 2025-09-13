import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsItem } from '../../shared/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent {
  @Input() news: NewsItem | null = null;
  @Output() saved = new EventEmitter<NewsItem>();
  @Output() cancel = new EventEmitter<void>();

  submit() {
    if (this.news) {
      this.saved.emit(this.news);
    }
  }
}