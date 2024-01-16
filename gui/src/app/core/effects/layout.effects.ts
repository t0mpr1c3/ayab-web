import { Injectable } from "@angular/core";
import { tap } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromKnit from '../actions/knit.actions';

@Injectable()
export class UserEffects {
  public registration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromKnit.imageLoaded),
      tap(() => {})
    ),
    { dispatch: false }
  );

  constructor(private _actions$: Actions) {}
}