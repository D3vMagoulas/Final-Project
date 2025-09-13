import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsItem } from '../../shared/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnChanges {
  @Input() news: NewsItem | null = null;
  @Output() saved = new EventEmitter<NewsItem>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: [''],
      publishedAt: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news']) {
      if (this.news) {
        this.form.patchValue(this.news);
      } else {
        this.form.reset();
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const payload = { ...this.news, ...this.form.value } as any;
      if (!payload.publishedAt) {
        delete payload.publishedAt;
      }
      this.saved.emit(payload);
    }
  }
}