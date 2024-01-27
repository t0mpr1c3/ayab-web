import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import FormDialogComponent from '../../shared/components/form-dialog/form-dialog.component';
import FirmwareDialogComponent from './firmware-upload-dialog/firmware-upload-dialog.component';
import FirmwareFacade from '../facade/firmware.facade';

@Component({
  template: '',
  providers: [FirmwareFacade],
  host: { dialog: 'FirmwareDialogComponent' },
})
export default class FirmwareDialogEntryComponent {
  private _dialogRef: MatDialogRef<FormDialogComponent, any>;
  private _subscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _facade: FirmwareFacade,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.openDialog();
  }
  
  public openDialog(): void {
    this._facade.startFirmware();
    this._dialogRef = this._dialog.open(
      FormDialogComponent,  
      { 
        data: { 
          formType: FirmwareDialogComponent,
          title: 'Firmware Upload',
          icon: 'upload',
          message: 'Placeholder',
          success: true,
        }
      }
    );
    this._subscription = this._dialogRef.afterClosed().subscribe(() => {      
      this._facade.stopFirmware();
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}