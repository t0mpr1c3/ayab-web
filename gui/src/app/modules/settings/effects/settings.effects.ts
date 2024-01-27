import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUser from '../actions/settings.actions';

import UserApiService from '../services/user-api.service';
import LocalStorageService from '../../shared/services/local-storage.service';
import CustomSnackbarComponent from '../../shared/components/custom-snackbar/custom-snackbar.component';

@Injectable({ providedIn: 'root' })
export default class SettingsEffects {
  constructor(
    private _actions$: Actions,
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private _userApiService: UserApiService,
  ) {}
  
  // Update settings and JWT in local storage and alert user after settings updated
  public updateSettingsEffect$ = createEffect(() => 
    this._actions$.pipe(
      ofType(fromUser.updateSettingsAction),
      map(action => action.settings),
      tap(settings => {
        let user = this._localStorageService.user!;
        user.settings = settings;
        this._localStorageService.user = user;
      }),
      exhaustMap(settings =>
        this._userApiService.update(settings)
      ),
      tap(res => this._localStorageService.token = res.access_token),
      tap(() => this._snackBar.openFromComponent(
        CustomSnackbarComponent,
        {
          data: { message: 'Settings updated', icon: 'done' },
          duration: 3000,
        },
      )),
      tap(() => document.getElementById('myAyabMenuButton')?.blur()),
    ),
    { dispatch: false } // side effects only
  );
} 