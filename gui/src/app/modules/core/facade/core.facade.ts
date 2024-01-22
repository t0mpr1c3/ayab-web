import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as fromImage from '../actions/image.actions';
import * as fromLayout from '../actions/layout.actions';
import { Scale } from "../models/scale.model";

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
  public image$ = this._store.select(fromRoot.selectImage);
  public scale$ = this._store.select(fromRoot.selectImageScale);

  public transform(fn: (img: ImageData) => ImageData) {
    firstValueFrom(this.image$)
      .then(img => { img && this.imageLoaded( fn( img ))});
  }
  
  public zoom(increment: number, maxZoom: number = 8) {
    const aspectRatio = 1; // FIXME set aspect ratio in settings
    firstValueFrom(this.scale$)
      .then(scale => {
        let tryScale = scale.x + increment;
        let newScale = tryScale >= 1 && tryScale <= maxZoom ? tryScale: scale.x;
        this.imageZoomed({ x: newScale, y: newScale * aspectRatio });
      });
  }

  public imageLoaded(data: ImageData): void {
    console.log(data)
    this._store.dispatch(fromImage.imageLoadedAction({ data: data }));
  }

  public imageZoomed(scale: Scale): void {
    this._store.dispatch(fromImage.imageZoomAction({ scale: scale }));
  }
  
  public hideOptions(): void {
    this._store.dispatch(fromLayout.hideOptionsAction());
  }

  public showOptions(): void {
    this._store.dispatch(fromLayout.showOptionsAction());
  }
}