import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../actions/image.actions';

import SceneHelper from '../helpers/scene.helper';
import MutationObserverHelper from '../../shared/helpers/mutation-observer.helper';

@Injectable({ providedIn: 'root' })
export class ImageEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store,
  ) {}
  
  // Do all the impure stuff associated with image transforms:
  // - cache imageData after transform
  // - redraw canvas
  public onTransformImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        fromImage.loadImageAction,
        fromImage.invertImageAction,
        fromImage.stretchImageAction,
        fromImage.repeatImageAction,
        fromImage.reflectImageAction,
        fromImage.hFlipImageAction,
        fromImage.vFlipImageAction,
        fromImage.rotateImageLeftAction,
        fromImage.rotateImageRightAction,
      ),
      tap(() => firstValueFrom( this._store.select( fromRoot.selectScene ))
        .then(scene => scene.data && SceneHelper.drawCanvas( 
          scene.data, scene.scale, scene.startRow ))), // FIXME also offset from alignment, width from machine width
    ),
    { dispatch: false } // side effects only
  )
  
  public onCreateScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.createSceneAction),
      // Wait until SceneComponent exists
      tap(() => MutationObserverHelper.waitFor('#canvas').then(() =>
        // Load image from store into canvas
        firstValueFrom( this._store.select( fromRoot.selectScene )).then(scene => 
          scene.data && SceneHelper.drawCanvas( scene.data, scene.scale, scene.startRow ))
        ),
      ),
    ),
    { dispatch: false } // side effects only
  )

  public onZoomImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.zoomImageAction),
      tap(scale => {
        firstValueFrom( this._store.select( fromRoot.selectScene ))
          .then(scene => scene.data && SceneHelper.drawCanvas(
            scene.data, scale.scale, scene.startRow
          ).then());
      }),
    ),
    { dispatch: false } // side effects only
  )
}