import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, timer } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUser from '../actions/user.actions';

import { UserApiService } from '../services/user-api.service';
import { CancelService } from '../../../modules/core/services/cancel.service';
import { RegistrationConfirmationComponent } from '../components/registration-form/registration-confirmation/registration-confirmation.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private _clicks$ = fromEvent(document, 'click');
  private _keys$ = fromEvent(document, 'keydown');
  private _mouse$ = fromEvent(document, 'mousemove');

  constructor(
    private _actions$: Actions,
    private _cancelService: CancelService,
    private _dialog: MatDialog,
    private _localStorageService: LocalStorageService,
    private _userApiService: UserApiService,
  ) {}
  
  public confirmRegistration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.confirmRegistrationAction),
      map(action => ({ message: action.message, success: action.success})),
      tap(args => 
        this._dialog.open(
          RegistrationConfirmationComponent, 
          { data: args }
        ).afterClosed().subscribe(() =>
          (args.success ? this._cancelService.emit() : 0) // close registration dialog
        )
      ),
    ),
    { dispatch: false } // side effects only
  )

  public idle$ = createEffect(() =>
    merge(this._clicks$, this._keys$, this._mouse$).pipe(
      // 120 minute inactivity timeout
      switchMap(() => timer(120 * 60 * 1000)),
      map(() => fromUser.idleTimeoutAction())
    )
  );

  public registration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromUser.registrationAction),
      map(action => action.credentials),
      exhaustMap(credentials =>
        this._userApiService.register(credentials)
      ),
      tap(res => this._localStorageService.maybeSetToken(res.access_token)), // side effect
      map(res => fromUser.confirmRegistrationAction({
        message: res.statusMessage,
        success: res.statusCode >= 200 && res.statusCode < 300
      })),
    )
  );

  public updateSettings$ = createEffect(() => 
    this._actions$.pipe(
      ofType(fromUser.updateSettingsAction),
      map(action => action.settings),
      tap(settings => {
        let user = this._localStorageService.getUser()!;
        user.settings = settings;
        this._localStorageService.setUser(user);
      }),
      exhaustMap(settings =>
        this._userApiService.update(settings)
      ),
      tap(res => this._localStorageService.maybeSetToken(res.access_token)),
    ),
    { dispatch: false } // side effects only
  );
}