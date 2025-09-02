import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';

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
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = '/api/auth';
  private storageKey = 'token';

  login(body: AuthRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body).pipe(
      tap(res => localStorage.setItem(this.storageKey, res.token)),
      map(() => void 0)
    );
  }

  signup(body: SignupRequest): Observable<void> {
    return this.http.post<void>(`${this.base}/signup`, body);
  }

  googleLogin(): Observable<void> {
    return of({ token: 'demo-google-jwt' }).pipe(
      delay(600),
      tap(res => localStorage.setItem(this.storageKey, res.token)),
      map(() => void 0)
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
