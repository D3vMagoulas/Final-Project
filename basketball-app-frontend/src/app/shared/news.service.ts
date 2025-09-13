import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string | null;
}

@Injectable({providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private store = new BehaviorSubject<NewsItem[]>([]);
  list$ = this.store.asObservable();

  list() {
    return this.list$;
  }

  refresh() {
    this.http
      .get<NewsItem[]>(`${environment.apiBase}/api/news/latest`)
      .subscribe((v) => this.store.next(v));
  }

  add(news: Omit<NewsItem, 'id' | 'imageUrl'>, image?: File) {
    const formData = new FormData();
    formData.append('news', new Blob([JSON.stringify(news)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.post<NewsItem>(`${environment.apiBase}/api/news`, formData);
  }

  update(news: NewsItem, image?: File) {
    const formData = new FormData();
    formData.append('news', new Blob([JSON.stringify(news)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<NewsItem>(
      `${environment.apiBase}/api/news/${news.id}`,
      formData
    );
  }

  remove(id: number) {
    return this.http.delete<void>(`${environment.apiBase}/api/news/${id}`);
  }
}