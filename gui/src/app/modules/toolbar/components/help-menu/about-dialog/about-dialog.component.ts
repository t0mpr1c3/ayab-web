import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'about-dialog',
  templateUrl: 'about-dialog.component.html',
  styleUrls: ['about-dialog.component.css'],
})
export class AboutDialogComponent {  
  constructor(
    private _dialogRef: MatDialogRef<AboutDialogComponent>,
  ) {}

  public close(): void {
    this._dialogRef.close();
  }
}