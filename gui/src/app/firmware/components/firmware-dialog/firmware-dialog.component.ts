import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FirmwareFacade } from '../../facade/firmware.facade';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  templateUrl: 'firmware-dialog.component.html',
  styleUrls: ['firmware-dialog.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    GenericButtonComponent,
  ],
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