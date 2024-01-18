import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AuthFacade } from '../../../../auth/facade/auth.facade';
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
  providers: [AuthFacade],
})
export class MyAYABMenuComponent {
  public loggedIn$ = this._facade.loggedIn$;
  public enabled$ = this._facade.menuEnabled$;

  public constructor(
    private _dialog: MatDialog,
    private _facade: AuthFacade,
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
    this._facade.logout();
  }
}
