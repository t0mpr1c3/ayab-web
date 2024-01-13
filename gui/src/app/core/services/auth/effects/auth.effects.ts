import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { loginFailure, loginRedirect, loginSuccess } from '../actions/auth-api.actions';
import { logout, logoutConfirmation, logoutConfirmationDismiss } from '../actions/auth.actions';
import { loginSubmit } from '../actions/login-page.actions';
import { idleTimeout } from '../../../actions/user.actions';
import { AuthService } from '../services/auth.service';
import { LoginCredentials } from '../../../../../../../shared/src/models/credentials.model';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog.component';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginSubmit),
      map((action) => action.credentials),
      exhaustMap((auth: LoginCredentials) =>
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
      ofType(idleTimeout),
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