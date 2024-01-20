import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FirmwareFacade } from '../../facade/firmware.facade';

@Component({
  templateUrl: './firmware-upload-dialog.component.html',
  styleUrls: ['./firmware-upload-dialog.component.css'],
  providers: [FirmwareFacade],
})
export class FirmwareDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, icon: string },
    private _dialogRef: MatDialogRef<FirmwareDialogComponent>,
    private _facade: FirmwareFacade,
  ) {
    this._facade.startFirmware();
  }

  public onClick(): void {
    this._dialogRef.close();
    this._facade.stopFirmware();
  }
}