import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, timer } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUser from '../actions/user.actions';

import { getUser, maybeSetToken, setUser } from '../../auth/helpers/local-storage';
import { UserApiService } from '../services/user-api.service';
import { CancelService } from '../../core/services/cancel.service';
import { RegistrationConfirmationDialog } from '../components/registration-form/registration-confirmation/registration-confirmation.component';

@Injectable()
export class UserEffects {
  private _clicks$ = fromEvent(document, 'click');
  private _keys$ = fromEvent(document, 'keydown');
  private _mouse$ = fromEvent(document, 'mousemove');

  public registration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.registration),
      map(action => action.credentials),
      exhaustMap(credentials =>
        this._userApiService.register(credentials)
      ),
      tap(res => maybeSetToken(res.access_token)), // side effect
      map(res => fromUser.confirmRegistration({
        message: res.statusMessage,
        success: res.statusCode >= 200 && res.statusCode < 300
      })),
    )
  );
  
  public confirmRegistration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.confirmRegistration),
      map(action => ({ message: action.message, success: action.success})),
      tap(args => 
        this._dialog.open(
          RegistrationConfirmationDialog, 
          { data: args }
        ).afterClosed().subscribe(() =>
          (args.success ? this._cancelService.emit() : 0) // close registration dialog
        )
      ),
    ),
    { dispatch: false } // side effects only
  )

  public updateSettings$ = createEffect(() => 
    this._actions$.pipe(
      ofType(fromUser.updateSettings),
      map(action => action.settings),
      tap(settings => {
        let user = getUser()!;
        user.settings = settings;
        setUser(user);
      }),
      exhaustMap(settings =>
        this._userApiService.update(settings)
      ),
      tap(res => maybeSetToken(res.access_token)),
    ),
    { dispatch: false } // side effects only
  );

  public idle$ = createEffect(() =>
    merge(this._clicks$, this._keys$, this._mouse$).pipe(
      // 120 minute inactivity timeout
      switchMap(() => timer(120 * 60 * 1000)),
      map(() => fromUser.idleTimeout())
    )
  );

  constructor(
    private _actions$: Actions,
    private _userApiService: UserApiService,
    private _dialog: MatDialog,
    private _cancelService: CancelService,
  ) {}
}