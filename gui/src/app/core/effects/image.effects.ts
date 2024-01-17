import { Injectable } from "@angular/core";
import { tap } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromImage from '../actions/image.actions';

@Injectable()
export class ImageEffects {
  public registration$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.imageLoaded),
      tap(() => {})
    ),
    { dispatch: false }
  );

  constructor(private _actions$: Actions) {}
}