import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../../image/actions/image.actions';
import * as fromLayout from '../../core/actions/layout.actions';

import { Scale } from '../../toolbar/models/scale.model';
import SceneHelper from '../../image/helpers/scene.helper';

/**
 * @title Toolbar facade
 */
@Injectable()
export class ToolbarFacade {
  public menuEnabled$ = this._store.select(fromRoot.selectMenuEnabled);
  public imageLoaded$ = this._store.select(fromRoot.selectImageLoaded);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public image$ = this._store.select(fromRoot.selectImage);
  public scale$ = this._store.select(fromRoot.selectImageScale);

  static MAX_ZOOM = 8;
  
  constructor(private _store: Store<fromRoot.State>) {}

  public transform(fn: (img: ImageData) => ImageData) {
    firstValueFrom(this.image$)
      .then(data => { data && this.imageLoaded( fn( SceneHelper.deserialize( data )))});
  }
  
  public zoom(increment: number, maxZoom: number = ToolbarFacade.MAX_ZOOM) {
    const aspectRatio = 1; // FIXME set aspect ratio in settings
    firstValueFrom(this.scale$)
      .then(scale => {
        let tryScale = scale.x + increment;
        let newScale = tryScale >= 1 && tryScale <= maxZoom ? tryScale: scale.x;
        this.imageZoomed({ x: newScale, y: newScale * aspectRatio });
      });
  }

  public imageLoaded(data: ImageData): void {
    this._store.dispatch(fromImage.imageLoadedAction({ 
      data: SceneHelper.serialize( data ),
    }));
  }

  public imageZoomed(scale: Scale): void {
    this._store.dispatch(fromImage.imageZoomAction({ scale: scale }));
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptionsAction());
  }
}