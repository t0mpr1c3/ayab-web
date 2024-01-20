import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'registration-confirmation',
  templateUrl: 'registration-confirmation.component.html',
  styleUrls: ['registration-confirmation.component.css'],
})
export class RegistrationConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<RegistrationConfirmationComponent>,
  ) {}
  
  public onClick(): void {
    this._dialogRef.close();
  }
}