import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './firmware-upload-dialog.component.html',
  styleUrls: ['./firmware-upload-dialog.component.css'],
})
export default class FirmwareDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<FirmwareDialogComponent>,
  ) {}

  public onClick(): void {
    this._dialogRef.close();
  }
}