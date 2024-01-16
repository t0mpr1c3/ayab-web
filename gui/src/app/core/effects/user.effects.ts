import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, timer } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUser from '../actions/user.actions';

import { maybeSetToken, setUser } from '../../auth/helpers/auth';
import { UserApiService } from '../services/user-api.service';
import { RegistrationConfirmationDialog } from '../components/toolbar/my-ayab-menu/registration-form/registration-confirmation/registration-confirmation.component';
import { CancelService } from '../services/cancel.service';

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

  public update$ = createEffect(() => 
    this._actions$.pipe(
      ofType(fromUser.update),
      map(action => action.user),
      tap(user => setUser(user)),
      exhaustMap(user =>
        this._userApiService.update(user)
      ),
      tap(res => maybeSetToken(res.access_token)),
    ),
    { dispatch: false } // side effects only
  );

  public idle$ = createEffect(() =>
    merge(this._clicks$, this._keys$, this._mouse$).pipe(
      // 15 minute inactivity timeout
      switchMap(() => timer(15 * 60 * 1000)),
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