import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';
import { TestFacade } from '../../facade/test.facade';

@Component({
  standalone: true,
  templateUrl: 'test-dialog.component.html',
  styleUrls: ['test-dialog.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    GenericButtonComponent,
  ],
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