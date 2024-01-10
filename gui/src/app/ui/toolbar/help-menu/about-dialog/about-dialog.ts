import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericButton } from '../../../generic-button/generic-button';

@Component({
  standalone: true,
  selector: 'about-dialog',
  templateUrl: 'about-dialog.html',
  styleUrls: ['about-dialog.css'],
  imports: [GenericButton],
})
export class AboutDialog {  
  constructor(
    private _dialogRef: MatDialogRef<AboutDialog>,
  ) {}

  public close(): void {
    this._dialogRef.close();
  }
}