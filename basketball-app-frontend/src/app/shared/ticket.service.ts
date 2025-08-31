import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Fixture {
  id: number;
  opponent: string;
  date: string;
  price: number;
}

export interface PurchaseResponse {
  token: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/tickets`;

  list(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.base);
  }

  purchase(fixtureId: number, qty: number): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(`${this.base}/${fixtureId}/purchase`, { qty });
  }
}
