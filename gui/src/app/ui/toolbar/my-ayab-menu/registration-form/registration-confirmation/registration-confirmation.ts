import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GenericButton } from '../../../../generic-button/generic-button';

@Component({
  standalone: true,
  selector: 'registration-confirmation',
  templateUrl: 'registration-confirmation.html',
  styleUrls: ['registration-confirmation.css'],
  imports: [
    CommonModule,
    MatIconModule,
    GenericButton,
  ],
})
export class RegistrationConfirmationDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<RegistrationConfirmationDialog>,
  ) {}
  
  public onClick(): void {
    this._dialogRef.close();
  }
}