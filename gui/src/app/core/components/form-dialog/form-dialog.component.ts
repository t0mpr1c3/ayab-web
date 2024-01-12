import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RegistrationForm } from '../toolbar/my-ayab-menu/registration-form/registration-form.component';
import { LoginForm } from '../toolbar/my-ayab-menu/login-form/login-form.component';
import { SettingsForm } from '../toolbar/my-ayab-menu/settings-form/settings-form.component';
import { CancelService } from '../../services/cancel.service';

// permissable types of Form that can be used in Dialog
export interface DialogData {
  formType: 
    ComponentType<RegistrationForm> 
  | ComponentType<LoginForm>
  | ComponentType<SettingsForm>,
}

@Component({
  standalone: true,  
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['form-dialog.component.css'],
  imports: [NgComponentOutlet],
})
export class FormDialog {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FormDialog>,
    private _cancelService: CancelService,
  ) {
    this._cancelService.cancel$.subscribe(() => {
      this._dialogRef.close();
    });
  }
}