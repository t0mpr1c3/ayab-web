import { Component, ElementRef, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import SceneHelper from '../../../image/helpers/scene.helper';
import ToolbarFacade from '../../facade/toolbar.facade';
import CustomSnackbarComponent from '../../../shared/components/custom-snackbar/custom-snackbar.component';

/** 
 * @title Load image button component
 **/
@Component({
  selector: 'load-image-button',
  templateUrl: 'load-image-button.component.html',
  styleUrls: ['load-image-button.component.css'],
})
export default class LoadImageButtonComponent {
  public enabled$ = this._facade.menuEnabled$;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    file && this._processFile( file );
  }

  constructor(
    private _facade: ToolbarFacade,
    private _host: ElementRef<HTMLInputElement>,
    private _snackBar: MatSnackBar,
  ) {}

  private _processFile(imageFile: File) {      
    if (imageFile.type !== 'image/png') { // FIXME allow other formats
      // File is wrong format
      this._snackBar.openFromComponent(
        CustomSnackbarComponent,
        {
          data: { message: 'File is wrong format', icon: 'error' },
          duration: 3000,
        },
      );
      return;
    }

    if (imageFile.size > 40000) { // sanity check: 200 * 500 * 4
      // File is too big
      this._snackBar.openFromComponent(
        CustomSnackbarComponent,
        {
          data: { message: 'Image file is too big', icon: 'error' },
          duration: 3000,
        },
      );
      return;
    }

    // Save image data to state
    SceneHelper.getImageData( imageFile ).then( 
      data => data && this._facade.imageLoaded( data )
    ).catch(err => { 
      throw err; 
    });
  }
} 