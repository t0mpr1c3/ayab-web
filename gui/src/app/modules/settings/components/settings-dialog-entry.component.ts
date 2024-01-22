import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';

/** 
 * @title Settings dialog entry component
 **/
@Component({
  template: '',
})
export class SettingsDialogEntryComponent {
  private _dialogRef: MatDialogRef<FormDialogComponent, any>;

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.openDialog();
  }
  
  public openDialog(): void {
    this._dialogRef = this._dialog.open(
      FormDialogComponent,  
      { 
        data: { 
          formType: SettingsFormComponent,
          title: 'Settings',
          icon: 'settings', // 'account_circle'
        }
      }
    );
    this._dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}