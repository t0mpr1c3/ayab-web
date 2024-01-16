import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromAuth from '../actions/auth.actions';
import * as fromLogin from '../actions/login.actions';
import * as fromUser from '../../core/actions/user.actions';

import { AuthService } from '../services/auth.service';
import { LoginCredentials } from '../../../../../shared/src/models/credentials.model';
import { getUser, isLoggedOut } from '../helpers/auth';

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
    private _authService: AuthService,
  ) {}

  public boot$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAuth.boot),
      map(() => (isLoggedOut() ? 
        fromAuth.isLoggedOut() : 
        fromAuth.isLoggedIn({ user: getUser()! })
      )),
    )
  )

  public loginSubmit$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromLogin.loginSubmit),
      map(action => action.credentials),
      exhaustMap((auth: LoginCredentials) =>
        this._authService.loginSubmit(auth).pipe(
          map(user => fromAuthApi.loginSuccess({ user })),
          catchError(error => of(fromAuthApi.loginFailure({ error })))
        )
      )
    )
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
      tap(() => this._authService.logout())
    ),
    { dispatch: false } // side effects only
  );
}