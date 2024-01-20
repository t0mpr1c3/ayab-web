import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CoreFacade } from '../../facade/core.facade';

/**
 * @title Layout component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
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