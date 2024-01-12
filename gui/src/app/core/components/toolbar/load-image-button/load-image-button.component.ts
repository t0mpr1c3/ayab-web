import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, timer } from 'rxjs';

import { drawCanvas } from '../../../helpers/canvas';
import { ImageLoadedService } from '../../../services/image-loaded.service';

/** 
 * @title Load image button
 **/
@Component({
  standalone: true,
  selector: 'load-image-button',
  templateUrl: 'load-image-button.component.html',
  styleUrls: ['load-image-button.component.css'],
  imports: [
    MatButtonModule,
  ]
})
export class LoadImageButton {
  public imageFile: File;
  private _checkUpload: Subscription;

  constructor(private _imageLoadedService: ImageLoadedService) {}

  public onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // Check if file has been uploaded
    this._checkUpload = timer(0, 500).subscribe(() => {
      const checkFile = files[0];
      if (checkFile) {
        this.processFile(event);
      }
    });
  }
  
  // Runs after user uploads file;
  public processFile(event: Event): void {
    this._checkUpload.unsubscribe();
    this._imageLoadedService.emit();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.imageFile = files[0] as File;
    if (this.imageFile.size > 10000) {
      // File too big
      return; // FIXME alert user
    }
    if (this.imageFile.type !== 'image/png') {
      // File wrong format
      return; // FIXME alert user
    }
    drawCanvas(this.imageFile)
      .then()
      .catch(err => {
        throw err;
      });
  }
} 