import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { AuthRequest, SignupRequest } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  private isAuthedSig = signal<boolean>(!!this.storage.getToken());
  public userNameSig = signal<string | null>(
    this.readNameFromToken(this.storage.getToken())
  );

  public rolesSig = signal<string[]>(
    this.readRolesFromToken(this.storage.getToken())
  );
  public userEmailSig = signal<string | null>(
    this.readEmailFromToken(this.storage.getToken())
  );

  private parseToken(token: string | null): any | null {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const json = new TextDecoder().decode(
        Uint8Array.from(atob(payload), c => c.charCodeAt(0))
      );
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  private readNameFromToken(token: string | null): string | null {
    const payload = this.parseToken(token);
    return (
      payload?.name ||
      payload?.fullName ||
      payload?.username ||
      payload?.sub ||
      payload?.email ||
      null
    );
  }

  private readEmailFromToken(token: string | null): string | null {
    const payload = this.parseToken(token);
    return payload?.email ?? payload?.sub ?? null;
  }

  private readRolesFromToken(token: string | null): string[] {
    const payload = this.parseToken(token);
    if (!payload) return [];
    const roles = payload.roles;
    if (Array.isArray(roles)) return roles;
    if (typeof roles === 'string') return [roles];
    return [];
  }

  isLoggedIn(): boolean {
    return this.isAuthedSig();
  }
  userName(): string | null {
    return this.userNameSig();
  }
  userEmail(): string | null {
    return this.userEmailSig();
  }
  getToken(): string | null {
    return this.storage.getToken();
  }

  isAdmin(): boolean {
    return this.rolesSig().includes('ROLE_ADMIN');
  }

  login(payload: AuthRequest) {
    return this.http
      .post<{ token: string }>(
        `${environment.apiBase}${environment.auth.login}`,
        payload
      )
      .pipe(
        tap(res => {
          this.storage.setToken(res.token);
          this.isAuthedSig.set(true);
          this.userNameSig.set(this.readNameFromToken(res.token));
          this.userEmailSig.set(this.readEmailFromToken(res.token));
          this.rolesSig.set(this.readRolesFromToken(res.token));
        })
      );
  }

  signup(payload: SignupRequest) {
    return this.http.post<void>(
      `${environment.apiBase}${environment.auth.signup}`,
      payload
    );
  }

  logout() {
    this.storage.clearToken();
    this.isAuthedSig.set(false);
    this.userNameSig.set(null);
    this.userEmailSig.set(null);
    this.rolesSig.set([]);
  }
}