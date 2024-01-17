import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';

import { ProfileComponent } from '../../../containers/profile.component';
import { ToolsMenuComponent } from './tools-menu/tools-menu.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { LoadImageButtonComponent } from './load-image-button/load-image-button.component';
import { KnitButtonComponent } from './knit-button/knit-button.component';
import { CancelKnittingButtonComponent } from './cancel-button/cancel-button.component';

/**
 * @title Toolbar component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule,
    ProfileComponent,
    ToolsMenuComponent,
    HelpMenuComponent,
    LoadImageButtonComponent,
    KnitButtonComponent,
    CancelKnittingButtonComponent,
  ],
})
export class ToolbarComponent {
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public enabled$ = this._store.select(fromRoot.selectMenuEnabled);

  constructor(private _store: Store<fromRoot.State>) {}
}