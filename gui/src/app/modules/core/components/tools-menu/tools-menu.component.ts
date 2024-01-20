import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { FormDialogComponent } from '../../../shared/components/form-dialog/form-dialog.component';
import { TestDialogComponent } from '../../../test-device/components/test-dialog/test-dialog.component';
import { FirmwareDialogComponent } from '../../../firmware-upload/components/firmware-upload-dialog/firmware-upload-dialog.component';

/**
 * @title Tools menu component
 */
 @Component({
  selector: 'tools-menu',
  templateUrl: 'tools-menu.component.html',
  styleUrls: ['tools-menu.component.css'],
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
      { 
        data: { 
          formType: TestDialogComponent,
          title: 'Hardware Test',
          icon: 'build',
          message: 'Placeholder',
          success: true,
        }
      }
    );
  }

  public startFirmware(): void {
    this._dialog.open(
      FormDialogComponent,  
      { 
        data: { 
          formType: FirmwareDialogComponent,
          title: 'Load Firmware',
          icon: 'upload',
          message: 'Placeholder',
          success: true,
        }
      }
    );
  }
}
