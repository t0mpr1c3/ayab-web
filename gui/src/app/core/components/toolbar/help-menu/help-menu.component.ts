import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

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
    MatButtonModule, 
    MatMenuModule,
  ],
})
export class HelpMenuComponent {  
  public constructor(private _dialog: MatDialog) {}

  public openAboutDialog(): void {
    this._dialog.open(AboutDialogComponent, {});
  }
}
