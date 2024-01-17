import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../auth/actions/auth.actions';

import { SubmitService } from '../../../services/submit.service';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { RegistrationFormComponent } from '../../../../profile/components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../../../auth/components/login-form/login-form.component';
import { SettingsFormComponent } from '../../../../profile/components/settings-form/settings-form.component';

/**
 * @title My AYAB menu
 */
 @Component({
  standalone : true,
  selector: 'my-ayab-menu',
  templateUrl: 'my-ayab-menu.component.html',
  styleUrls: ['my-ayab-menu.component.css'],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class MyAYABMenuComponent {
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public enabled$ = this._store.select(fromRoot.selectMenuEnabled);

  public constructor(
    private _store: Store<fromRoot.State>,
    private _dialog: MatDialog,
    private _submitService: SubmitService,
  ) {}

  public openRegistrationDialog(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: RegistrationFormComponent }}
    );
  }

  public openLoginDialog(): void {
    this._dialog.open(
      FormDialogComponent, 
      { data: { formType: LoginFormComponent }}
    );
  }

  public openSettingsDialog(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: SettingsFormComponent }}
    );
  }

  public logout(): void {
    this._submitService.emit({ action: fromAuth.logout });
  }
}
