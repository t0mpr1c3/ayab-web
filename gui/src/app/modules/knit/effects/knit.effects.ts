import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../reducers';
import * as fromKnit from '../actions/knit.actions';

import CustomSnackbarComponent from '../../shared/components/custom-snackbar/custom-snackbar.component';

@Injectable({ providedIn: 'root' })
export default class KnitEffects {
  constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    //private _store: Store,
  ) {}
  
  public knittingCanceled$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromKnit.stopKnittingAction),
      tap(() => this._snackBar.openFromComponent(
        CustomSnackbarComponent,
        {
          data: { message: 'Knitting canceled', icon: 'warning' },
          duration: 3000,
        },
      )),
    ),
    { dispatch: false } // side effects only
  )
}