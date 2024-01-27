import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromReg from '../actions/registration.actions';

import CancelService from '../../shared/services/cancel.service';
import LocalStorageService from '../../shared/services/local-storage.service';
import UserApiService from '../../settings/services/user-api.service';
import RegistrationConfirmationComponent from '../components/registration-confirmation/registration-confirmation.component';

@Injectable({ providedIn: 'root' })
export default class RegistrationEffects {
  constructor(
    private _actions$: Actions,
    private _cancelService: CancelService,
    private _dialog: MatDialog,
    private _localStorageService: LocalStorageService,
    private _userApiService: UserApiService,
  ) {}
  
  public confirmRegistration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromReg.confirmRegistrationAction),
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

  public registration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromReg.registrationAction),
      map(action => action.credentials),
      exhaustMap(credentials =>
        this._userApiService.register(credentials)
      ),
      tap(res => this._localStorageService.token = res.access_token), // side effect
      map(res => fromReg.confirmRegistrationAction({
        message: res.statusMessage,
        success: res.statusCode >= 200 && res.statusCode < 300
      })),
    )
  );
}