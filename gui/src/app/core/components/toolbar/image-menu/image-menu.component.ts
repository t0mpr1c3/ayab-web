import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import Transforms from '../../../helpers/transforms.helper';
import { CoreFacade } from '../../../facade/core.facade';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { ImageStretchFormComponent } from './image-stretch-form.component';
import { ImageRepeatFormComponent } from './image-repeat-form.component';
import { ImageReflectFormComponent } from './image-reflect-form.component';

/**
 * @title Image menu component
 */
 @Component({
  standalone : true,
  selector: 'image-menu',
  templateUrl: 'image-menu.component.html',
  styleUrls: ['image-menu.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule, 
    MatDividerModule,
    MatMenuModule,
  ],
  providers: [CoreFacade]
})
export class ImageMenuComponent {
  constructor(
    private _dialog: MatDialog,
    private _facade: CoreFacade,
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