import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import Scene from '../../helpers/scene.helper';
import { CoreFacade } from '../../facade/core.facade';

/** 
 * @title Load image button component
 **/
@Component({
  selector: 'load-image-button',
  templateUrl: 'load-image-button.component.html',
  styleUrls: ['load-image-button.component.css'],
  providers: [CoreFacade],
})
export class LoadImageButtonComponent {
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
    private _facade: CoreFacade,
  ) {}

  public onFileChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    // Set timer to check if file has been uploaded every 500ms
    // (FIXME I'm sure there is a more elegant way of doing this)
    this._checkUpload = timer(0, 500).subscribe(() => {
      const checkFile = files[0];
      if (checkFile) {
        this.processFile(event);
      }
    });
  }
  
  // Runs after user uploads file;
  public processFile(event: Event): void {
    // Halt timer
    this._checkUpload.unsubscribe();

    // Get image file
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

    // Show image on canvas
    Scene.getImageData(this.imageFile)
      .then(data => {
        if (!!data) {
          // Update state
          this._facade.imageLoaded(data);
          this._facade.showOptions();
        }
      })
      .catch(err => {
        throw err;
      });
  }
} 