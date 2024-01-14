import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SubmitService } from '../../services/submit.service';
import { CancelService } from '../../services/cancel.service';
import { RegistrationFormComponent } from '../toolbar/my-ayab-menu/registration-form/registration-form.component';
import { LoginFormComponent } from '../toolbar/my-ayab-menu/login-form/login-form.component';
import { SettingsFormComponent } from '../toolbar/my-ayab-menu/settings-form/settings-form.component';

// permissable types of Form that can be used in Dialog
export interface DialogData {
  formType: 
    ComponentType<RegistrationFormComponent> 
  | ComponentType<LoginFormComponent>
  | ComponentType<SettingsFormComponent>,
}

@Component({
  standalone: true,  
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['form-dialog.component.css'],
  imports: [NgComponentOutlet],
})
export class FormDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FormDialogComponent>,
    private _submitService: SubmitService,
    private _cancelService: CancelService,
  ) {
    this._submitService.submit$.subscribe(payload => {
      this._dialogRef.close();
      console.log(payload)
    });
    this._cancelService.cancel$.subscribe(() => {
      this._dialogRef.close();
    });
  }
}