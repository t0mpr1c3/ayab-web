import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CancelService } from '../../../../services/cancel.service';
import { RegistrationFormComponent } from '../../../../../profile/components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../../../../auth/components/login-form/login-form.component';
import { SettingsFormComponent } from '../../../../../profile/components/settings-form/settings-form.component';
import { Subscription } from 'rxjs';

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
export class FormDialogComponent implements OnDestroy {
  public cancelSubscription: Subscription;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FormDialogComponent>,
    private _cancelService: CancelService,
  ) {
    this.cancelSubscription = this._cancelService.cancel
      .subscribe(() => this._dialogRef.close());
  }

  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}