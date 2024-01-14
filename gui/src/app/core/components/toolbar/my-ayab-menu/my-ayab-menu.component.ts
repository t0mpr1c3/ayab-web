import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';

import { Logout } from '../../../services/auth-xstate-machine/auth-machine.events';
import { AuthService } from '../../../services/auth/services/auth.service';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SettingsFormComponent } from './settings-form/settings-form.component';

/**
 * @title My AYAB menu
 */
 @Component({
  standalone : true,
  selector: 'my-ayab-menu',
  templateUrl: 'my-ayab-menu.component.html',
  styleUrls: ['my-ayab-menu.component.css'],
  imports: [
    MatButtonModule, 
    MatMenuModule,
    CommonModule,
  ],
})
export class MyAYABMenuComponent {
  public loggedIn$: Observable<boolean>;

  public constructor(
    private _dialog: MatDialog,
    private _authService: AuthService,
    //private _authMachineService: AuthMachineService,
  ) {
    //this.loggedIn$ = this._authMachineService.loggedIn();
  }   

  public openRegistrationDialog(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: RegistrationFormComponent }});
  }

  public openLoginDialog(): void {
    this._dialog.open(
      FormDialogComponent, 
      { data: { formType: LoginFormComponent }});
  }

  public openSettingsDialog(): void {
    this._dialog.open(
      FormDialogComponent,  
      { data: { formType: SettingsFormComponent }});
  }

  public logout(): void {
    this._authService.logout();
    //this._authMachineService.service.send(new Logout());
  }
}
