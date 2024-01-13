import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';

import { getUser, isLoggedOut } from '../helpers/auth';
import { LoginCredentials } from '../../../../../../../shared/src/models/credentials.model';
import { User, defaultUserData } from '../../../../../../../shared/src/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login({ username, password }: LoginCredentials): Observable<User> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'test' && username !== 'ngrx' && password !== '123') {
      return throwError(() => 'Invalid username or password');
    }

    return of(defaultUserData);
  }

  logout() {
    return of(true);
  }

  /*
  public send(event: AuthEvent): void {
    this.service.send(event);
  }
  */

  private _user: BehaviorSubject<User|null>;
  public user$: Observable<User|null>;
  public loggedIn$: Observable<boolean>;
  
  constructor(
    private _authService: AuthService,
  ) {
    /*
    this.service = createActor(this._authMachine).start();
    this.service.send(new Init(isLoggedOut()));
    */
    this._user = new BehaviorSubject<User|null>(getUser());
  }

  public user(): Observable<User|null> {
    return this._user.asObservable();
  }

  public loggedIn(): Observable<boolean> {
    return this.user().pipe( map<User|null, boolean>(user => !!user));
  }
}