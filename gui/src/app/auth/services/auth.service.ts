import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { removeToken, removeUser, setToken, setUser } from '../helpers/auth';
import { AuthApiService } from '../../core/services/auth-api.service';
import { LoginCredentials } from '../../../../../shared/src/models/credentials.model';
import { User } from '../../../../../shared/src/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {  
  constructor(private _authApiService: AuthApiService) {}

  public loginSubmit(credentials: LoginCredentials): Observable<User> {
    return this._authApiService.login(credentials).pipe(      
      tap(loginResponse => setUser(loginResponse.user)),
      tap(loginResponse => setToken(loginResponse.access_token)),
      map(loginResponse => loginResponse.user),
      catchError(err => of({ ...err.error }))
    );
  }

  public logout() {
    removeUser();
    removeToken();
  }
}