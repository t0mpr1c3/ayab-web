import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'test-dialog.component.html',
  styleUrls: ['test-dialog.component.css'],
})
export class TestDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<TestDialogComponent>,
  ) {}

  public onClick(): void {
    this._dialogRef.close();
  }
}