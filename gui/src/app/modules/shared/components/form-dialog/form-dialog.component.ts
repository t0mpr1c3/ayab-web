import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { CancelService } from '../../services/cancel.service';
import { RegistrationFormComponent } from '../../../registration/components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../../auth/components/login-form/login-form.component';
import { SettingsFormComponent } from '../../../settings/components/settings-form/settings-form.component';
import { ImageStretchFormComponent } from '../../../image/components/image-menu/image-stretch-form.component';
import { ImageRepeatFormComponent } from '../../../image/components/image-menu/image-repeat-form.component';
import { FirmwareDialogComponent } from '../../../firmware-upload/components/firmware-upload-dialog/firmware-upload-dialog.component';
import { TestDialogComponent } from '../../../test-device/components/test-dialog/test-dialog.component';

// Permissable types of Form that can be used in Dialog
export interface DialogData {
  formType: ComponentType<any> 
  /*
  | ComponentType<RegistrationFormComponent>
  | ComponentType<LoginFormComponent>
  | ComponentType<SettingsFormComponent>
  | ComponentType<ImageStretchFormComponent>
  | ComponentType<ImageRepeatFormComponent>
  | ComponentType<FirmwareDialogComponent>
  | ComponentType<TestDialogComponent>,
  */
  title: string,
  icon: string,
}

/**
 * @title Form dialog component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['form-dialog.component.css'],
})
export class FormDialogComponent {
  private _subscription: Subscription;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FormDialogComponent>,
    private _cancelService: CancelService,
  ) {
    this._subscription = this._cancelService.cancel
      .subscribe(() => {
        this._subscription.unsubscribe();
        this._dialogRef.close()
      });
  }
}