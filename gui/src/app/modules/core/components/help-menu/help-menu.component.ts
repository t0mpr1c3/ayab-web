import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { CoreFacade } from '../../facade/core.facade';

/**
 * @title Help menu comoponent
 */
 @Component({
  selector: 'help-menu',
  templateUrl: 'help-menu.component.html',
  styleUrls: ['help-menu.component.css'],
})
export class HelpMenuComponent {
  public enabled$ = this._facade.menuEnabled$;

  public constructor(
    private _dialog: MatDialog,
    private _facade: CoreFacade,
  ) {}

  public openAboutDialog(): void {
    this._dialog.open(AboutDialogComponent, {});
  }
}
