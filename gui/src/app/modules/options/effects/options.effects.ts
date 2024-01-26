import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../reducers';
import * as fromOptions from '../actions/options.actions';

import SceneHelper from '../../image/helpers/scene.helper';

@Injectable({ providedIn: 'root' })
export class OptionsEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store,
  ) {}
  
  public onSetStartRowOptionAction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromOptions.setStartRowOptionAction),
      tap(row => firstValueFrom( this._store.select( fromRoot.selectScene ))
        .then(scene => scene.data && SceneHelper.drawCanvas( 
          scene.data, scene.scale, row.startRow ))), // FIXME also offset from alignment, width from machine width
    ),
    { dispatch: false} // side effects only
  )
}