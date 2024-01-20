import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as fromKnit from '../actions/knit.actions';

/**
 * @title Knit facade
 */
@Injectable()
export class KnitFacade {
  constructor(private _store: Store<fromRoot.State>) {}
  
  public knitButtonEnabled$ = this._store.select(fromRoot.selectConfiguring);
  public cancelButtonEnabled$ = this._store.select(fromRoot.selectKnitting);

  public startKnitting(): void {
    this._store.dispatch(fromKnit.startKnittingAction());
  }

  public stopKnitting(): void {
    this._store.dispatch(fromKnit.stopKnittingAction());
  }
}