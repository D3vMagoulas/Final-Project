import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fixture {
  id: number;
  opponent: string;
  date: string;
  venue: string;
}

export interface PurchaseRequest {
  fixtureId: number;
  qty: number;
}

export interface PurchaseResponse {
  id: number;
  status: 'OK';
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private base = '/api';

  list(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(`${this.base}/fixtures`);
  }

  purchase(body: PurchaseRequest): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(`${this.base}/tickets/purchase`, body);
  }
}
