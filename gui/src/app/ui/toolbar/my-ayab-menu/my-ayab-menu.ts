import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';

import { FormDialog } from '../../form-dialog/form-dialog';
import { RegistrationForm } from './registration-form/registration-form';
import { LoginForm } from './login-form/login-form';
import { SettingsForm } from './settings-form/settings-form';
import { MatDialog } from '@angular/material/dialog';
import { AuthMachineService } from '../../../services/auth-machine/auth-machine.service';
import { Logout } from '../../../services/auth-machine/auth-machine.events';

/**
 * @title My AYAB menu
 */
 @Component({
  standalone : true,
  selector: 'my-ayab-menu',
  templateUrl: 'my-ayab-menu.html',
  styleUrls: ['my-ayab-menu.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
    CommonModule,
  ],
})
export class MyAYABMenu {
  public loggedIn$: Observable<boolean>;

  public constructor(
    private _dialog: MatDialog,
    private _authMachineService: AuthMachineService,
  ) {
    this.loggedIn$ = this._authMachineService.loggedIn();
  }   

  public openRegistrationDialog(): void {
    this._dialog.open(
      FormDialog,  
      {data: {formType: RegistrationForm}});
  }

  public openLoginDialog(): void {
    this._dialog.open(
      FormDialog, 
      {data: {formType: LoginForm}});
  }

  public openSettingsDialog(): void {
    this._dialog.open(
      FormDialog,  
      {data: {formType: SettingsForm}});
  }

  public logout(): void {
    this._authMachineService.service.send(new Logout());
  }
}
