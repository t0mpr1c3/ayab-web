import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GenericButtonComponent } from '../../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: 'registration-confirmation',
  templateUrl: 'registration-confirmation.component.html',
  styleUrls: ['registration-confirmation.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    GenericButtonComponent,
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