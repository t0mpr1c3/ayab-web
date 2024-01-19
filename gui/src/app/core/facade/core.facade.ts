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
  public enableOptions$ = this._store.select(fromRoot.selectConfiguring);
  public menuEnabled$ = this._store.select(fromRoot.selectMenuEnabled);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public imageLoaded$ = this._store.select(fromRoot.selectImageLoaded);

  public imageLoaded(): void {
    this._store.dispatch(fromImage.imageLoadedAction());
  }
  
  public hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptionsAction());
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptionsAction());
  }
}