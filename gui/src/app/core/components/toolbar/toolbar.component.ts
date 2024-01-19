import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MyAYABMenuComponent } from './my-ayab-menu/my-ayab-menu.component';
import { ToolsMenuComponent } from './tools-menu/tools-menu.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { LoadImageButtonComponent } from './load-image-button/load-image-button.component';
import { KnitButtonComponent } from './knit-button/knit-button.component';
import { CancelKnittingButtonComponent } from './cancel-button/cancel-button.component';
import { ImageMenuComponent } from './image-menu/image-menu.component';
import { CoreFacade } from '../../facade/core.facade';

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
    MyAYABMenuComponent,
    ImageMenuComponent,
    ToolsMenuComponent,
    HelpMenuComponent,
    LoadImageButtonComponent,
    KnitButtonComponent,
    CancelKnittingButtonComponent,
  ],
  providers: [CoreFacade],
})
export class ToolbarComponent {
  public loggedIn$ = this._facade.loggedIn$;
  public enabled$ = this._facade.menuEnabled$;
  public imageLoaded$ = this._facade.imageLoaded$;

  constructor(private _facade: CoreFacade) {}
}