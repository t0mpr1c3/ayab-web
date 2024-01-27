import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import ImageFacade from '../../facade/image.facade';
import FormDialogComponent from '../../../shared/components/form-dialog/form-dialog.component';
import ImageStretchFormComponent from './image-stretch-form.component';
import ImageRepeatFormComponent from './image-repeat-form.component';
import ImageReflectFormComponent from './image-reflect-form.component';

/**
 * @title Image menu component
 */
 @Component({
  selector: 'image-menu',
  templateUrl: 'image-menu.component.html',
  styleUrls: ['image-menu.component.css'],
  providers: [ImageFacade],
})
export default class ImageMenuComponent {
  constructor(
    private _dialog: MatDialog,
    private _facade: ImageFacade,
  ) {}

  public invert() { this._facade.invertImage() }

  public stretch() {
    this._dialog.open(
      FormDialogComponent, 
      { 
        data: { 
          formType: ImageStretchFormComponent,
          title: 'Stretch Image',
          icon: 'transform',
        }
      }
    );
  }

  public repeat() {
    this._dialog.open(
      FormDialogComponent, 
      { 
        data: { 
          formType: ImageRepeatFormComponent,
          title: 'Repeat Image',
          icon: 'filter',
        }
      }
    );
  }

  public reflect() {
    this._dialog.open(
      FormDialogComponent, 
      { 
        data: { 
          formType: ImageReflectFormComponent,
          title: 'Reflect Image',
          icon: 'flip',
        }
      }
    );
  }

  public hflip() { this._facade.hFlipImage() }

  public vflip() { this._facade.vFlipImage() }

  public rotateLeft() { this._facade.rotateImageLeft() }

  public rotateRight() { this._facade.rotateImageRight() }

  public zoomIn() { this._facade.zoom( +0.5 )}

  public zoomOut() { this._facade.zoom( -0.5 )}
}