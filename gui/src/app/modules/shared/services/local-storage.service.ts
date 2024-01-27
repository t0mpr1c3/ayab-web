import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../../../../../../shared/src/models/user.model';
import * as fromRoot from '../../../reducers';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _tokenKey = 'jwt' as const;
  private _userKey = 'user' as const;
  private _stateKey = 'state' as const;

  public get token(): string|null {
    return localStorage.getItem( this._tokenKey );
  }

  public set token(token: string | undefined) {
    if (token) {
      localStorage.setItem( this._tokenKey, token );
    }
  }

  public removeToken(): void {
    localStorage.removeItem( this._tokenKey );
  }

  public get user(): User|null {
    return JSON.parse( localStorage.getItem( this._userKey ) || '{}');
  }

  public set user(userData: User) {
    localStorage.setItem( this._userKey, JSON.stringify( userData ));
  }

  public removeUser(): void {
    localStorage.removeItem( this._userKey );
    this.removeToken();
  }

  public get state(): fromRoot.State|null {
    return JSON.parse( localStorage.getItem( this._stateKey ) || '{}');
  }

  public set state(state: fromRoot.State) {
    localStorage.setItem( this._stateKey, JSON.stringify( state ));
  }

  public removeState(): void {
    localStorage.removeItem( this._stateKey );
  }

  public get isLoggedIn(): boolean {
    return (
      !!localStorage.getItem( this._userKey ) &&
      !!localStorage.getItem( this._tokenKey ) &&
      this._tokenNotExpired( localStorage.getItem( this._tokenKey )!));
  }

  public get isLoggedOut(): boolean {
    return !this.isLoggedIn;
  }
  
  private _tokenNotExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>( token );
      const exp = decoded.exp;
      if (!!exp && (Date.now() < exp * 1000)) {
        return true;
      }
    } catch (error) {}
    return false;
  }
}