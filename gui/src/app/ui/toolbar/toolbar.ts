import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

//import { FileMenu } from '../_file-menu/file-menu';
import { ToolsMenu } from './tools-menu/tools-menu';
import { MyAYABMenu } from './my-ayab-menu/my-ayab-menu';
import { HelpMenu } from './help-menu/help-menu';
import { OpenFileButton } from './open-file-button/open-file-button';
import { KnitButton } from './knit-button/knit-button';
import { CancelButton } from './cancel-button/cancel-button';
import { AuthMachineService } from '../../services/auth-machine/auth-machine.service';

/**
 * @title Toolbar
 */
@Component({
  standalone: true,
  selector: 'toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.css'],
  imports: [
    MatToolbarModule, 
    CommonModule,
    MatIconModule,
    //FileMenu, 
    ToolsMenu, 
    MyAYABMenu, 
    HelpMenu, 
    OpenFileButton,
    KnitButton, 
    CancelButton,
  ],
})
export class Toolbar {
  constructor(private _authMachineService: AuthMachineService) {}

  public loggedIn$ = this._authMachineService.loggedIn();
}