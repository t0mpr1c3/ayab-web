import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AuthMachineService } from '../../services/auth-machine/auth-machine.service';
import { ToolsMenu } from './tools-menu/tools-menu';
import { MyAYABMenu } from './my-ayab-menu/my-ayab-menu';
import { HelpMenu } from './help-menu/help-menu';
import { LoadImageButton } from './load-image-button/load-image-button';
import { KnitButton } from './knit-button/knit-button';
import { CancelButton } from './cancel-button/cancel-button';

/**
 * @title Toolbar
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  selector: 'toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.css'],
  imports: [
    MatToolbarModule, 
    CommonModule,
    MatIconModule,
    ToolsMenu, 
    MyAYABMenu, 
    HelpMenu, 
    LoadImageButton,
    KnitButton, 
    CancelButton,
  ],
})
export class Toolbar {
  constructor(
    private _authMachineService: AuthMachineService,
    private _dialog: MatDialog,
  ) {}

  public loggedIn$ = this._authMachineService.loggedIn();
}