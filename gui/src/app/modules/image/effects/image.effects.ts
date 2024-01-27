import { Injectable } from '@angular/core';
import { combineLatest, of, switchMap, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../actions/image.actions';
import * as fromOptions from '../../options/actions/options.actions';

import SceneHelper from '../helpers/scene.helper';
import MutationObserverHelper from '../../shared/helpers/mutation-observer.helper';
import OptionsService from '../../options/services/options.service';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';

@Injectable({ providedIn: 'root' })
export default class ImageEffects {
  constructor(
    private _actions$: Actions,
    private _optionsService: OptionsService,
    private _store: Store,
  ) {}
  
  // When scene created, wait until SceneComponent exists then draw canvas
  public createSceneEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromImage.createSceneAction),
      switchMap(() => this._store.select( fromRoot.selectScene )),
      tap(scene => MutationObserverHelper.waitFor('#canvas').then(() =>
        scene.data && SceneHelper.drawCanvas( scene )
      )),
    ),
    { dispatch: false } // side effects only
  )
  
  // Update options when image loaded
  public loadImageEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType( fromImage.loadImageAction ),
      tap(image => {
        this._optionsService.formControls.startRow.setValue( 1 );
        this._optionsService.formControls.startNeedle.setValue( Math.ceil(image.data.width / 2) );
        this._optionsService.formControls.startColor.setValue( ColorEnum.orange );
        this._optionsService.formControls.stopNeedle.setValue( Math.floor(image.data.width / 2) );
        this._optionsService.formControls.stopColor.setValue( ColorEnum.green );
      }),
      switchMap(image => image.data && of(
        fromOptions.setStartRowOptionAction({ startRow: 1 }),
        fromOptions.setStartNeedleOptionAction({ startNeedle: Math.ceil(image.data.width / 2) }),
        fromOptions.setStartColorOptionAction({ startColor: ColorEnum.orange }),
        fromOptions.setStopNeedleOptionAction({ stopNeedle: Math.floor(image.data.width / 2) }),
        fromOptions.setStopColorOptionAction({ stopColor: ColorEnum.green }),
      )),
    )
  )

  // Update scene on when image zoomed
  public zoomImageEffect$ = createEffect(() =>
    combineLatest([
      this._actions$.pipe( ofType( fromImage.zoomImageAction )),
      this._store.select( fromRoot.selectScene ),
    ]).pipe(
      tap(([scale, scene]) => scene.data && SceneHelper.drawCanvas({
        ...scene,
        scale: scale.scale,
      }).then())
    ),
    { dispatch: false } // side effects only
  )

  // Update scene when image transformed
  public transformImageEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        fromImage.invertImageAction,
        fromImage.stretchImageAction,
        fromImage.repeatImageAction,
        fromImage.reflectImageAction,
        fromImage.hFlipImageAction,
        fromImage.vFlipImageAction,
        fromImage.rotateImageLeftAction,
        fromImage.rotateImageRightAction,
      ),
      switchMap(() => this._store.select( fromRoot.selectScene )),
      tap(scene => scene.data && SceneHelper.drawCanvas( scene )),
    ),
    { dispatch: false } // side effects only
  )
}