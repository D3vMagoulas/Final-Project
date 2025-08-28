import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  login(body: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, body).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }
}
