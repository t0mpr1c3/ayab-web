import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CoreFacade } from '../facade/core.facade';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { OptionsPanelComponent } from './options/options.component';

/**
 * @title Layout component
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    OptionsPanelComponent,
  ],
  providers: [CoreFacade],
})
export class LayoutComponent {
  public showOptions$ = this._facade.showOptions$;

  constructor(private _facade: CoreFacade) {}
  
  public hideOptions() {
    this._facade.hideOptions();
  }
  
  public showOptions() {
    this._facade.showOptions();
  }
}