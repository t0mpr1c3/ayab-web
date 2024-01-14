import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as root from '../../../reducers';
import { selectLoggedIn } from '../../services/auth/reducers/auth.reducer';

import { ProfileComponent } from '../../../containers/profile.component';
import { ToolsMenuComponent } from './tools-menu/tools-menu.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { LoadImageButtonComponent } from './load-image-button/load-image-button.component';
import { KnitButtonComponent } from './knit-button/knit-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

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
    ProfileComponent,
    ToolsMenuComponent,
    HelpMenuComponent,
    LoadImageButtonComponent,
    KnitButtonComponent,
    CancelButtonComponent,
  ],
})
export class ToolbarComponent {
  constructor(
    private _store: Store<root.State>,
    private _dialog: MatDialog,
  ) {}

  public loggedIn$ = this._store.select(selectLoggedIn);
}