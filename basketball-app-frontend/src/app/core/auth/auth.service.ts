import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = '/api/auth';

  login(body: AuthRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body).pipe(
      tap(res => localStorage.setItem('token', res.token)),
      map(() => void 0)
    );
  }

  signup(body: {
    name: string; surname: string; email: string; phone: string; password: string;
  }): Observable<void> {
    return this.http.post<void>(`${this.base}/signup`, body);
  }

  logout(): void { localStorage.removeItem('token'); }
  getToken(): string | null { return localStorage.getItem('token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
