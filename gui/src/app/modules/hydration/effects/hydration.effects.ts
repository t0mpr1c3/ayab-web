import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromHydrate from '../actions/hydration.actions';

import LocalStorageService from '../../shared/services/local-storage.service';

// Side effects to re-hydrate state from local storage
// https://nils-mehlhorn.de/posts/ngrx-keep-state-refresh/
@Injectable()
export default class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this._action$.pipe(
      ofType(fromHydrate.hydrateAction),
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
  
  serialize$ = createEffect(() =>
    this._action$.pipe(
      ofType(fromHydrate.hydrationSuccessAction, fromHydrate.hydrationFailureAction),
      switchMap(() => this._store),
      distinctUntilChanged(),
      tap(state => this._local.state = state )
    ),
    { dispatch: false }
  );
 
  constructor(
    private _action$: Actions, 
    private _local: LocalStorageService,
    private _store: Store<fromRoot.State>,
  ) {}
 
  ngrxOnInitEffects(): Action {
    return fromHydrate.hydrateAction();
  }
}