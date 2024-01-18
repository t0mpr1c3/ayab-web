import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { StartTestingService } from '../../../../test/services/start-testing.service';
import { StartFirmwareService } from '../../../../firmware/services/start-firmware.service';
import { CancelService } from '../../../services/cancel.service';
import { FormDialogComponent } from '../my-ayab-menu/form-dialog/form-dialog.component';
import { TestDialogComponent } from '../../../../test/components/test-dialog/test-dialog.component';
import { FirmwareDialogComponent } from '../../../../firmware/components/firmware-dialog/firmware-dialog.component';

/**
 * @title Tools menu
 */
 @Component({
  standalone : true,
  selector: 'tools-menu',
  templateUrl: 'tools-menu.component.html',
  styleUrls: ['tools-menu.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class ToolsMenuComponent {
  public enabled$ = this._store.select(fromRoot.selectMenuEnabled);
  private _dialogRef: MatDialogRef<FormDialogComponent>;
  private _subscription: Subscription;

  constructor(
    private _store: Store<fromRoot.State>,
    private _startTestingService: StartTestingService,
    private _startFirmwareService: StartFirmwareService,
    private _dialog: MatDialog,
    private _cancelService: CancelService,
  ) {}

  public startTesting(): void {
    this._startTestingService.emit();
    this._dialogRef = this._dialog.open(
      FormDialogComponent,  
      { data: { formType: TestDialogComponent }}
    );
    this.cancelAfterClosed();
  }

  public startFirmware(): void {
    this._startFirmwareService.emit();
    this._dialogRef = this._dialog.open(
      FormDialogComponent,  
      { data: { formType: FirmwareDialogComponent }}
    );
    this.cancelAfterClosed();
  }

  public cancelAfterClosed() {
    this._subscription = this._dialogRef.afterClosed()
      .subscribe(() => {
        this._subscription.unsubscribe();
        this._cancelService.emit();
    });
  }
}
