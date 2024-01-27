import { Injectable } from '@angular/core';
import { distinctUntilChanged, first, map, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromHydrate from '../actions/hydration.actions';

import LocalStorageService from '../../shared/services/local-storage.service';
import OptionsService from '../../options/services/options.service';

// Re-hydrate state from local storage
// https://nils-mehlhorn.de/posts/ngrx-keep-state-refresh/
@Injectable()
export default class HydrationEffects implements OnInitEffects {
  constructor(
    private _action$: Actions, 
    private _local: LocalStorageService,
    private _optionsService: OptionsService,
    private _store: Store<fromRoot.State>,
  ) {}
 
  ngrxOnInitEffects(): Action {
    return fromHydrate.hydrateAction();
  }

  public hydrateEffect$ = createEffect(() =>
    this._action$.pipe(
      ofType( fromHydrate.hydrateAction ),
      map(() => {
        try {
          const state = this._local.state;
          if (state) {
            return fromHydrate.hydrationSuccessAction({ state });
          }
        } catch {
          this._local.removeState();
        }
        return fromHydrate.hydrationFailureAction();
      })
    )
  );
  
  // Persist current state to local storage
  public serializeEffect$ = createEffect(() =>
    this._action$.pipe(
      ofType( fromHydrate.hydrationSuccessAction, fromHydrate.hydrationFailureAction ),
      switchMap(() => this._store),
      distinctUntilChanged(),
      tap(state => { this._local.state = state; })
    ),
    { dispatch: false }
  );

  // Update options panel on hydration success
  public hydrationSuccessEffect$ = createEffect(() =>
    this._action$.pipe(
      ofType( fromHydrate.hydrationSuccessAction ),
      switchMap(() => this._store.select( fromRoot.selectOptionsState )),
      first(),
      tap(state => {
        this._optionsService.formControls.mode.setValue( state.mode );
        this._optionsService.formControls.colors.setValue( state.colors );
        this._optionsService.formControls.startRow.setValue( state.startRow );
        this._optionsService.formControls.infRepeat.setValue( state.infRepeat );
        this._optionsService.formControls.startNeedle.setValue( state.startNeedle );
        this._optionsService.formControls.startColor.setValue( state.startColor );
        this._optionsService.formControls.stopNeedle.setValue( state.stopNeedle );
        this._optionsService.formControls.stopColor.setValue( state.stopColor );
        this._optionsService.formControls.alignment.setValue( state.alignment );
        this._optionsService.formControls.knitSide.setValue( state.knitSide );
      }),
    ),
    { dispatch: false }
  );
 
}