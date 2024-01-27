import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, timer } from 'rxjs';

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
  public imageFile: File;
  private _checkUpload: Subscription;
/*
  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }
*/
  constructor(
    //private _host: ElementRef<HTMLInputElement>,
    private _facade: ToolbarFacade,
    private _snackBar: MatSnackBar,
  ) {}

  public onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    // Set timer to check every 500ms if file has been uploaded
    // (FIXME I'm sure there is a more elegant way of doing this)
    this._checkUpload = timer(0, 500).subscribe(() => {
      const checkFile = files[0];
      if (checkFile) {
        this.processFile(event);
      }
    });
  }
  
  // Runs after user uploads file
  public processFile(event: Event): void {
    // Halt timer
    this._checkUpload.unsubscribe();

    // Get image file
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.imageFile = files[0] as File;
    if (this.imageFile.type !== 'image/png') { // FIXME allow oher formats
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
    if (this.imageFile.size > 40000) { // sanity check: 200 * 500 * 4
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
    SceneHelper.getImageData(this.imageFile)
      .then(data => {
        if (!!data) {
          // Update state
          this._facade.imageLoaded(data);
        }
      })
      .catch(err => {
        throw err;
      });
  }
} 