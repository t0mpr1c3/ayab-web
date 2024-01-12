import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { loginFailure, loginRedirect, loginSuccess } from '../actions/auth-api.actions';
import { logout, logoutConfirmation, logoutConfirmationDismiss } from '../actions/auth.actions';
import { login } from '../actions/login-page.actions';
import { Credentials } from '../models/credentials.model';
import { AuthService } from '../services/auth.service';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';
import { UserActions } from '@example-app/core/actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(login),
      map((action) => action.credentials),
      exhaustMap((auth: Credentials) =>
        this._authService.login(auth).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccess),
        tap(() => this._router.navigate(['/']))
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginRedirect, logout),
        tap(() => {
          this._router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this._dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result ? logout() : logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => logout())
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}
}