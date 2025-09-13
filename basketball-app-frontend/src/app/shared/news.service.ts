import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
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

  add(news: Omit<NewsItem, 'id'>) {
    return this.http.post<NewsItem>(`${environment.apiBase}/api/news`, news);
  }

  update(news: NewsItem) {
    return this.http.put<NewsItem>(
      `${environment.apiBase}/api/news/${news.id}`,
      news
    );
  }

  remove(id: number) {
    return this.http.delete<void>(`${environment.apiBase}/api/news/${id}`);
  }
}