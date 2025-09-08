import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  id: number;
  number: number;
  name: string;
  position: string;
}

@Injectable({ providedIn: 'root' })
export class RosterService {
  private http = inject(HttpClient);
  private store = new BehaviorSubject<Player[]>([]);
  list$ = this.store.asObservable();

  list() {
    return this.list$;
}

  refresh() {
    this.http
      .get<Player[]>(`${environment.apiBase}/roster/players`)
      .subscribe((v) => this.store.next(v));
  }
  
  add(player: Omit<Player, 'id'>) {
     return this.http.post<Player>(
      `${environment.apiBase}/roster/players`,
      player
    );
  }

  update(player: Player) {
    return this.http.put<Player>(
      `${environment.apiBase}/roster/players/${player.id}`,
      player
    );
  }

  remove(id: number) {
    return this.http.delete<void>(
      `${environment.apiBase}/roster/players/${id}`
    );
  }
}
