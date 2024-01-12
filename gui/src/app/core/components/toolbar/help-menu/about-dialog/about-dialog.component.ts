import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericButton } from '../../../generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: 'about-dialog',
  templateUrl: 'about-dialog.component.html',
  styleUrls: ['about-dialog.component.css'],
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