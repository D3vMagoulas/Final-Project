import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  attachmentUrls?: string[];
  publishedAt?: string | null;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private http = inject(HttpClient);
  private store = new BehaviorSubject<NewsItem[]>([]);
  list$ = this.store.asObservable();

  list() {
    return this.list$;
  }

  refresh() {
    const size = 50;
    const all: NewsItem[] = [];

    const load = (page: number) => {
      this.http
        .get<NewsItem[]>(`${environment.apiBase}/api/news`, {
          params: { page, size },
        })
        .subscribe((items) => {
          items.forEach((item) => {
            if (item.imageUrl) {
              item.imageUrl = new URL(item.imageUrl, environment.apiBase).toString();
            }

            if (item.attachmentUrls?.length) {
              item.attachmentUrls = item.attachmentUrls.map((url) =>
                new URL(url, environment.apiBase).toString(),
              );
            }
          });

          all.push(...items);

          if (items.length === size) {
            load(page + 1);
          } else {
            this.store.next(all);
          }
        });
    };

    load(0);
  }

  add(formData: FormData) {
    return this.http.post<NewsItem>(`${environment.apiBase}/api/news`, formData);
  }

  update(id: number, formData: FormData) {
    return this.http.put<NewsItem>(`${environment.apiBase}/api/news/${id}`, formData);
  }

  remove(id: number) {
    return this.http.delete<void>(`${environment.apiBase}/api/news/${id}`);
  }
}