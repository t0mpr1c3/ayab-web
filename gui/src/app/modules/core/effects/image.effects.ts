import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../actions/image.actions';

import SceneHelper from '../helpers/scene.helper';

@Injectable({ providedIn: 'root' })
export class ImageEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store,
  ) {}
  
  public imageLoaded$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.imageLoadedAction),
      tap(image => SceneHelper.reloadCanvas(image.data)),
    ),
    { dispatch: false } // side effects only
  )
  
  public imageZoomed$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.imageZoomAction),
      tap(scale => {
        firstValueFrom(this._store.select(fromRoot.selectImage))
          .then(data => data && SceneHelper.zoomCanvas(data, scale.scale).then());
      }),
    ),
    { dispatch: false } // side effects only
  )
}