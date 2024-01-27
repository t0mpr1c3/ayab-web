import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import RegistrationFacade from '../facade/registration.facade';
import FormDialogComponent from '../../shared/components/form-dialog/form-dialog.component';
import RegistrationFormComponent from './registration-form/registration-form.component';

/** 
 * @title Registration dialog entry component
 **/
@Component({
  template: '',
  providers: [RegistrationFacade],
})
export default class RegistrationDialogEntryComponent {
  private _dialogRef: MatDialogRef<FormDialogComponent, any>;

  constructor(
    private _dialog: MatDialog,
    private _facade: RegistrationFacade,
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
          formType: RegistrationFormComponent,
          title: 'Welcome to AYAB',
          icon: 'how_to_reg',
        }
      }
    );
    this._dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}