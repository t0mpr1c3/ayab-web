import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CoreFacade } from '../../facade/core.facade';

/**
 * @title Toolbar component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  providers: [CoreFacade],
})
export class ToolbarComponent {
  public loggedIn$ = this._facade.loggedIn$;
  public enabled$ = this._facade.menuEnabled$;
  public imageLoaded$ = this._facade.imageLoaded$;

  constructor(private _facade: CoreFacade) {}
}