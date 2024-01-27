import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import FormDialogComponent from '../../shared/components/form-dialog/form-dialog.component';
import TestDialogComponent from './test-dialog/test-dialog.component';
import TestFacade from '../facade/test.facade';

@Component({
  template: '',
  providers: [TestFacade],
  host: { dialog: 'TestDialogComponent' },
})
export default class TestDialogEntryComponent {
  private _dialogRef: MatDialogRef<FormDialogComponent, any>;
  private _subscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _facade: TestFacade,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.openDialog();
  }
  
  public openDialog(): void {
    this._facade.startTesting();
    this._dialogRef = this._dialog.open(
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
    this._subscription = this._dialogRef.afterClosed().subscribe(() => {
      this._facade.stopTesting();
      this._router.navigate(['../'], { relativeTo: this._route });
    });
  }
}