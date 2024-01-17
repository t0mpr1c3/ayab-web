import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  templateUrl: 'test-dialog.component.html',
  styleUrls: ['test-dialog.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    GenericButtonComponent,
  ],
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