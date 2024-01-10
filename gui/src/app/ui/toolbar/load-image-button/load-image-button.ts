import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription, timer } from 'rxjs';

import { drawCanvas } from '../../../helpers/canvas';
import { GuiMachineService } from '../../../services/gui-machine/gui-machine.service';
import { ImageLoaded } from '../../../services/gui-machine/gui-machine.events';

/** 
 * @title Load image button
 **/
@Component({
  standalone: true,
  selector: 'load-image-button',
  templateUrl: 'load-image-button.html',
  styleUrls: ['load-image-button.css'],
  imports: [
    MatButtonModule,
  ]
})
export class LoadImageButton {
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  public imageFile: File;
  private _checkUpload: Subscription;

  constructor(private _guiMachineService: GuiMachineService) {}

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
    this._guiMachineService.service.send(new ImageLoaded());
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