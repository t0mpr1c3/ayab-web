import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

import FormDialogComponent from '../../shared/components/form-dialog/form-dialog.component';
import LoginFormComponent from './login-form/login-form.component';

@Component({
  template: '',
})
export default class LoginDialogEntryComponent {
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
          formType: LoginFormComponent,
          title: 'Sign In',
          icon: 'fingerprint',
        }
      }
    );
    this._dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}