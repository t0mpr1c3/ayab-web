import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import AuthFacade from '../../../auth/facade/auth.facade';

/**
 * @title My AYAB menu component
 */
 @Component({
  selector: 'my-ayab-menu',
  templateUrl: 'my-ayab-menu.component.html',
  styleUrls: ['my-ayab-menu.component.css'],
})
export default class MyAYABMenuComponent {
  public enabled$ = this._facade.menuEnabled$;
  public loggedIn$ = this._facade.loggedIn$;

  public constructor(
    private _dialog: MatDialog,
    private _facade: AuthFacade,
  ) {}

  public logout(): void {
    this._facade.logout();
  }
}
