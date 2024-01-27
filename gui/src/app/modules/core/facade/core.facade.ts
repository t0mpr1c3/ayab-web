import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromLayout from '../actions/layout.actions';
import * as fromImage from '../../image/actions/image.actions';

/**
 * @title Core facade
 */
@Injectable()
export default class CoreFacade {
  public imageLoaded$ = this._store.select(fromRoot.selectImageLoaded);
  public sceneCreated$ = this._store.select(fromRoot.selectSceneCreated);
  
  constructor(private _store: Store<fromRoot.State>) {}

  public hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptionsAction());
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptionsAction());
  }

  public createScene(): void {
    this._store.dispatch(fromImage.createSceneAction());
  }
}