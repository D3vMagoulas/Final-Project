import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  firstName: string;
  lastName: string;
  position: string;
  numberOnJersey: number;
  heightCm: number;
  birthDate: string;
  nationality: string;
  photoUrl: string;
  active: boolean;
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
      .get<Player[]>(`${environment.apiBase}/api/roster`)
      .subscribe((v) => this.store.next(v));
  }
  
  add(player: Omit<Player, 'id'>) {
     return this.http.post<Player>(
      `${environment.apiBase}/api/roster`,
      player
    );
  }

  update(player: Player) {
    return this.http.put<Player>(
      `${environment.apiBase}/api/roster/${player.id}`,
      player
    );
  }

  remove(id: number) {
    return this.http.delete<void>(
      `${environment.apiBase}/api/roster/${id}`
    );
  }
}
