// src/app/core/auth/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { AuthRequest, AuthResponse, SignupRequest } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  isAuthedSig = signal<boolean>(!!this.storage.getToken());

  login(payload: AuthRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiBase}${environment.auth.login}`, payload)
      .pipe(
        tap(res => {
          this.storage.setToken(res.token);
          this.isAuthedSig.set(true);
        })
      );
  }

  signup(payload: SignupRequest) {
    return this.http.post<void>(`${environment.apiBase}${environment.auth.signup}`, payload);
  }

  logout() {
    this.storage.clearToken();
    this.isAuthedSig.set(false);
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  getToken(): string | null {
    return this.storage.getToken();
  }
}
