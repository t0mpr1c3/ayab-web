import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromAuth from '../actions/auth.actions';
import * as fromLogin from '../actions/login.actions';
import * as fromUser from '../../profile/actions/user.actions';

import { AuthApiService } from '../services/auth-api.service';
import { LoginCredentials } from '../../../../../../shared/src/models/credentials.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

/*
 * In a service-based Angular application, components are responsible for interacting with 
 * external resources directly through services. Instead, effects provide a way to interact 
 * with those services and isolate them from the components. Effects are where you handle 
 * tasks such as fetching data, long-running tasks that produce multiple events, and other 
 * external interactions your components don't need explicit knowledge of.
 * 
 * Key Concepts:
 * 
 * - Effects isolate side effects from components, allowing for 
 *       more pure components that select state and dispatch actions.
 * - Effects are long-running services that listen to an observable 
 *       of every action dispatched from the Store.
 * - Effects filter those actions based on the type of action they 
 *       are interested in. This is done by using an operator.
 * - Effects perform tasks, which are synchronous or asynchronous 
 *       and return a new action.
 */

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authApiService: AuthApiService,
    private _localStorageService: LocalStorageService,
  ) {}

  public boot$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuth.bootAction),
      map(() => (this._localStorageService.isLoggedOut() ? 
        fromAuth.isLoggedOutAction() : 
        fromAuth.isLoggedInAction({ user: this._localStorageService.getUser()! })
      )),
    )
  );

  public idleTimeout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.idleTimeoutAction),
      map(() => fromAuth.logoutAction())
    )
  );

  public loginFailure$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthApi.loginFailureAction),
      tap(action => alert(action.error.statusText)) // FIXME
    ),
    { dispatch: false } // side effects only
  );

  public loginSubmit$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromLogin.loginSubmitAction),
      map(action => action.credentials),
      exhaustMap((credentials: LoginCredentials) =>
        this._authApiService.login(credentials).pipe(  
          tap(loginResponse => this._localStorageService.setUser(loginResponse.user)),
          tap(loginResponse => this._localStorageService.setToken(loginResponse.access_token)),
          map(loginResponse => fromAuthApi.loginSuccessAction({ user: loginResponse.user })),
          catchError(error => of(fromAuthApi.loginFailureAction({ error })))
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuth.logoutAction),
      tap(() => {
        this._localStorageService.removeUser();
        this._localStorageService.removeToken();
      })
    ),
    { dispatch: false } // side effects only
  );
}