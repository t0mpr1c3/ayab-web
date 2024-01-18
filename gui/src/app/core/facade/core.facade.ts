import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as fromImage from '../actions/image.actions';
import * as fromLayout from '../actions/layout.actions';

/**
 * @title Core facade
 */
@Injectable()
export class CoreFacade {
  constructor(private _store: Store<fromRoot.State>) {}

  public showOptions$ = this._store.select(fromRoot.selectShowOptions);
  public menuEnabled$ = this._store.select(fromRoot.selectMenuEnabled);

  public imageLoaded(): void {
    this._store.dispatch(fromImage.imageLoaded());
  }
  
  public hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptions());
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptions());
  }
}