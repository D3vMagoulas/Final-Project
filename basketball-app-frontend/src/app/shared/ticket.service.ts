import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fixture {
  id: number;
  opponent: string;
  home: boolean;
  venue: string;
  tipoff: string;
  competition: string;
  ticketsAvailable: number;
  ticketPrice: number;
}

export interface PurchaseRequest {
  gameId: number;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
}

export interface PurchaseResponse {
  id: number;
  gameId: number;
  quantity: number;
  status: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private base = '/api';

  list(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(`${this.base}/games/upcoming`);
  }

  purchase(body: PurchaseRequest): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(`${this.base}/tickets`, body);
  }
}