import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

export interface NewsItem { id:number; title:string; summary:string; }

@Injectable({providedIn:'root'})
export class NewsService {
  private http = inject(HttpClient);
  private store = new BehaviorSubject<NewsItem[]>([]);
  list$ = this.store.asObservable();

  list(){ return this.list$; }
  refresh(){
    this.http.get<NewsItem[]>(`${environment.apiBase}/news`)
      .subscribe(v => this.store.next(v));
  }
}