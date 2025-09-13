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
  @Output() saved = new EventEmitter<FormData>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
      attachments: [[]],
      publishedAt: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['news']) {
      if (this.news) {
        const { title, content, publishedAt } = this.news;
        this.form.patchValue({ title, content, publishedAt, image: null, attachments: [] });
        this.previewUrl = this.news.imageUrl ?? null;
      } else {
        this.form.reset();
        this.previewUrl = null;
      }
    }
  }

  previewUrl: string | ArrayBuffer | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files);
      this.form.patchValue({ attachments: files });
    }
  }

  submit() {
    if (this.form.valid) {
      const formData = new FormData();

      const news = {
        title: this.form.get('title')!.value,
        content: this.form.get('content')!.value,
        publishedAt: this.form.get('publishedAt')!.value,
      };
      formData.append(
        'news',
        new Blob([JSON.stringify(news)], { type: 'application/json' })
      );

      const imageFile = this.form.get('image')!.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const attachments = this.form.get('attachments')!.value as File[];
      if (attachments && attachments.length) {
        attachments.forEach((file) => formData.append('attachments', file));
      }

      if (this.news?.id) {
        formData.append('id', this.news.id.toString());
      }

      this.saved.emit(formData);
    }
  }
}