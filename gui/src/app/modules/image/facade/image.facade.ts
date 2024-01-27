import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromImage from '../actions/image.actions';

import TransformsHelper from '../helpers/transforms.helper';
import { Scale } from '../../toolbar/models/scale.model';
import { Mirrors } from '../model/mirrors.model';

/**
 * @title Image facade
 */
@Injectable()
export class ImageFacade {
  public image$ = this._store.select(fromRoot.selectImage);
  public scale$ = this._store.select(fromRoot.selectImageScale);

  static MAX_ZOOM = 8;
  
  constructor(private _store: Store<fromRoot.State>) {}
  
  public zoom(increment: number) {
    const aspectRatio = 1; // FIXME set aspect ratio in settings
    firstValueFrom(this.scale$)
      .then(scale => {        
        let newScale = Math.min( Math.max( scale.x + increment, 1), ImageFacade.MAX_ZOOM);
        this.zoomImage({ x: newScale, y: newScale * aspectRatio });
      });
  }

  public loadImage(data: ImageData): void {
    this._store.dispatch(fromImage.loadImageAction({ 
      data: TransformsHelper.serialize( data ),
    }));
  }

  public zoomImage(scale: Scale): void {
    this._store.dispatch(fromImage.zoomImageAction({ scale: scale }));
  }

  public invertImage(): void {
    this._store.dispatch(fromImage.invertImageAction());
  }
  
  public stretchImage(scale: Scale): void {
    this._store.dispatch(fromImage.stretchImageAction({ scale: scale }));
  }
  
  public repeatImage(scale: Scale): void {
    this._store.dispatch(fromImage.repeatImageAction({ scale: scale }));
  }
  
  public reflectImage(mirrors: Mirrors): void {
    this._store.dispatch(fromImage.reflectImageAction({ mirrors: mirrors }));
  }

  public hFlipImage(): void {
    this._store.dispatch(fromImage.hFlipImageAction());
  }

  public vFlipImage(): void {
    this._store.dispatch(fromImage.vFlipImageAction());
  }

  public rotateImageLeft(): void {
    this._store.dispatch(fromImage.rotateImageLeftAction());
  }

  public rotateImageRight(): void {
    this._store.dispatch(fromImage.rotateImageRightAction());
  }
}