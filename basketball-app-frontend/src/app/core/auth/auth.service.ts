import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private readonly base = `${environment.apiUrl}/auth`;

  login(body: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body);
  }

  logout() {
    localStorage.removeItem('token');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  set token(val: string | null) {
    if (val) localStorage.setItem('token', val);
    else localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
