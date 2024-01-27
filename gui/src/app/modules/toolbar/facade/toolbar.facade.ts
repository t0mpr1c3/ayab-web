import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../../image/actions/image.actions';
import * as fromLayout from '../../core/actions/layout.actions';

import TransformsHelper from '../../image/helpers/transforms.helper';

/**
 * @title Toolbar facade
 */
@Injectable()
export class ToolbarFacade {
  public menuEnabled$ = this._store.select(fromRoot.selectMenuEnabled);
  public imageLoaded$ = this._store.select(fromRoot.selectImageLoaded);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  
  constructor(private _store: Store<fromRoot.State>) {}

  public imageLoaded(data: ImageData): void {
    this._store.dispatch(fromImage.loadImageAction({ 
      data: TransformsHelper.serialize( data ),
    }));
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptionsAction());
  }
}