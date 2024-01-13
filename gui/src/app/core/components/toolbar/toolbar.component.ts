import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AuthMachineService } from '../../services/auth-xstate-machine/auth-machine.service';
import { ToolsMenu } from './tools-menu/tools-menu.component';
import { MyAYABMenu } from './my-ayab-menu/my-ayab-menu.component';
import { HelpMenu } from './help-menu/help-menu.component';
import { LoadImageButton } from './load-image-button/load-image-button.component';
import { KnitButton } from './knit-button/knit-button.component';
import { CancelButton } from './cancel-button/cancel-button.component';

/**
 * @title Toolbar
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
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