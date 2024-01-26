import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';

/**
 * @title Options facade
 */
@Injectable()
export class OptionsFacade {
  public enableOptions$ = this._store.select(fromRoot.selectConfiguring);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public settings$ = this._store.select(fromRoot.selectSettings);
  public rows$ = this._store.select(fromRoot.selectImageHeight);

  constructor(private _store: Store<fromRoot.State>) {}
}