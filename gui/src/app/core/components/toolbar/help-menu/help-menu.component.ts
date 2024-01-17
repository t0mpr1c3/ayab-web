import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';

/**
 * @title Help menu
 */
 @Component({
  standalone : true,
  selector: 'help-menu',
  templateUrl: 'help-menu.component.html',
  styleUrls: ['help-menu.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class HelpMenuComponent {
  public enabled$ = this._store.select(fromRoot.selectMenuEnabled);

  public constructor(
    private _store: Store<fromRoot.State>,
    private _dialog: MatDialog,
  ) {}

  public openAboutDialog(): void {
    this._dialog.open(AboutDialogComponent, {});
  }
}
