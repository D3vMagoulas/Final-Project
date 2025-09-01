import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignupRequest {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string; // keep if your API requires it
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/auth`;

  login(body: AuthRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body).pipe(
      tap((res) => localStorage.setItem('token', res.token)),
      tap(() => void 0) // makes the type Observable<void>
    );
  }

  signup(body: SignupRequest): Observable<void> {
    return this.http.post<void>(`${this.base}/signup`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
