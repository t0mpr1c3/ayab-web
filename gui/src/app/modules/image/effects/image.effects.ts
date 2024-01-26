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
      tap(() => firstValueFrom( this._store.select( fromRoot.selectImage ))
        .then(data => data && SceneHelper.loadCanvas( SceneHelper.deserialize( data )))),
    ),
    { dispatch: false} // side effects only
  )
  
  public onCreateScene$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.createSceneAction),
      // Wait until SceneComponent exists
      tap(() => MutationObserverHelper.waitFor('#canvas').then(() =>
        // Load image from store into canvas
        firstValueFrom( this._store.select( fromRoot.selectImage )).then(data => 
          data && SceneHelper.loadCanvas( SceneHelper.deserialize( data )))
        ),
      ),
    ),
    { dispatch: false} // side effects only
  )

  public onZoomImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.zoomImageAction),
      tap(scale => {
        firstValueFrom( this._store.select( fromRoot.selectImage ))
          .then(data => data && SceneHelper.zoomCanvas(
            SceneHelper.deserialize(data),
            scale.scale,
          ).then());
      }),
    ),
    { dispatch: false } // side effects only
  )
}