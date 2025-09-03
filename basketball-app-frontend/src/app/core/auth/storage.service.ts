import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = environment.storageKeys.token;

@Injectable({ providedIn: 'root' })
export class StorageService {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
