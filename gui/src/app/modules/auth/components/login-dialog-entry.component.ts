import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import AuthFacade from '../facade/auth.facade';
import FormDialogComponent from '../../shared/components/form-dialog/form-dialog.component';
import LoginFormComponent from './login-form/login-form.component';

@Component({
  template: '',
  providers: [AuthFacade],
})
export default class LoginDialogEntryComponent {
  private _dialogRef: MatDialogRef<FormDialogComponent, any>;
  private _subscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _facade: AuthFacade,
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
    this._subscription = this._dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}