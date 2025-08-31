import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Player { id:number; number:number; name:string; position:string; }

@Injectable({providedIn:'root'})
export class RosterService {
  private http = inject(HttpClient);
  private store = new BehaviorSubject<Player[]>([]);
  list$ = this.store.asObservable();

  list(){ return this.list$; }
  refresh(){
    this.http.get<Player[]>(`${environment.apiUrl}/roster/players`)
      .subscribe(v => this.store.next(v));
  }
}