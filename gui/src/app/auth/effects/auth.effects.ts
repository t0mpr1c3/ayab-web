import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromAuth from '../actions/auth.actions';
import * as fromLogin from '../actions/login.actions';
import * as fromUser from '../../profile/actions/user.actions';

import { AuthApiService } from '../services/auth-api.service';
import { getUser, isLoggedOut, removeToken, removeUser, setToken, setUser } from '../helpers/local-storage';
import { LoginCredentials } from '../../../../../shared/src/models/credentials.model';

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

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authApiService: AuthApiService,
  ) {}

  public boot$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuth.boot),
      map(() => (isLoggedOut() ? 
        fromAuth.isLoggedOut() : 
        fromAuth.isLoggedIn({ user: getUser()! })
      )),
    )
  );

  public loginSubmit$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromLogin.loginSubmit),
      map(action => action.credentials),
      exhaustMap((credentials: LoginCredentials) =>
        this._authApiService.login(credentials).pipe(  
          tap(loginResponse => setUser(loginResponse.user)),
          tap(loginResponse => setToken(loginResponse.access_token)),
          map(loginResponse => fromAuthApi.loginSuccess({ user: loginResponse.user })),
          catchError(error => of(fromAuthApi.loginFailure({ error })))
        )
      )
    )
  );

  public loginFailure$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuthApi.loginFailure),
      tap(action => alert(action.error.statusText)) // FIXME
    ),
    { dispatch: false } // side effects only
  );

  public idleTimeout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.idleTimeout),
      map(() => fromAuth.logout())
    )
  );

  public logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuth.logout),
      tap(() => {
        removeUser();
        removeToken();
      })
    ),
    { dispatch: false } // side effects only
  );
}