import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

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

  constructor(
    private _store: Store<fromRoot.State>,
    private _dialog: MatDialog,
  ) {}

  public startTesting(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: TestDialogComponent }}
    );
  }

  public startFirmware(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: FirmwareDialogComponent }}
    );
  }
}
