import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { ToolbarFacade } from '../../facade/toolbar.facade';

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
    private _facade: ToolbarFacade,
  ) {}

  public openAboutDialog(): void {
    this._dialog.open(AboutDialogComponent, {});
  }
}
