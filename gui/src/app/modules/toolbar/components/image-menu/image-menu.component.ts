import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import Transforms from '../../../image/helpers/transforms.helper';
import { FormDialogComponent } from '../../../shared/components/form-dialog/form-dialog.component';
import { ImageStretchFormComponent } from './image-stretch-form.component';
import { ImageRepeatFormComponent } from './image-repeat-form.component';
import { ImageReflectFormComponent } from './image-reflect-form.component';
import { ToolbarFacade } from '../../facade/toolbar.facade';

/**
 * @title Image menu component
 */
 @Component({
  selector: 'image-menu',
  templateUrl: 'image-menu.component.html',
  styleUrls: ['image-menu.component.css'],
  providers: [ToolbarFacade],
})
export class ImageMenuComponent {
  constructor(
    private _dialog: MatDialog,
    private _facade: ToolbarFacade,
  ) {}

  public invert() { this._facade.transform( Transforms.invertImage )}

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

  public hflip() { this._facade.transform( Transforms.hflipImage )}

  public vflip() { this._facade.transform( Transforms.vflipImage )}

  public rotateLeft() { this._facade.transform( Transforms.rotateLeftImage )}

  public rotateRight() { this._facade.transform( Transforms.rotateRightImage )}

  public zoomIn() { this._facade.zoom( +0.5, 8 )}

  public zoomOut() { this._facade.zoom( -0.5, 8 )}
}