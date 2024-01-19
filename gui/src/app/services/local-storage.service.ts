import { Injectable } from '@angular/core';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../../../../shared/src/models/user.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _tokenKey = 'jwt' as const;
  private _userKey = 'user' as const;

  public getToken(): string|null {
    return localStorage.getItem(this._tokenKey);
  }

  public getUser(): User|null {
    return JSON.parse(localStorage.getItem(this._userKey) || '{}');
  }

  public isLoggedIn(): boolean {
    return (
      !!localStorage.getItem(this._userKey) &&
      !!localStorage.getItem(this._tokenKey) &&
      this._tokenNotExpired(localStorage.getItem(this._tokenKey)!));
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public maybeSetToken(token?: string): void {
    if (token) {
      this.setToken(token);
    }
  }

  public removeToken(): void {
    localStorage.removeItem(this._tokenKey);
  }

  public removeUser(): void {
    localStorage.removeItem(this._userKey);
    this.removeToken();
  }

  public setToken(token: string): void {
    localStorage.setItem(this._tokenKey, token);
  }

  public setUser(userData: User): void {
    localStorage.setItem(this._userKey, JSON.stringify(userData));
  }

  private _tokenNotExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const exp = decoded.exp;
      if (!!exp && (Date.now() < exp * 1000)) {
        return true;
      }
    } catch (error) {}
    return false;
  }
}