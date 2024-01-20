import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TestFacade } from '../../facade/test.facade';

@Component({
  templateUrl: 'test-dialog.component.html',
  styleUrls: ['test-dialog.component.css'],
  providers: [TestFacade],
})
export class TestDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<TestDialogComponent>,
    private _facade: TestFacade,
  ) {
    this._facade.startTesting();
  }
  
  public onClick(): void {
    this._dialogRef.close();
    this._facade.stopTesting();
  }
}