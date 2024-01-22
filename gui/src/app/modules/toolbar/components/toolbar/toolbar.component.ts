import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarFacade } from '../../facade/toolbar.facade';

/**
 * @title Toolbar component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // https://blog.angular-university.io/onpush-change-detection-how-it-works/
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css'],
  providers: [ToolbarFacade],
})
export class ToolbarComponent {
  public loggedIn$ = this._facade.loggedIn$;
  public enabled$ = this._facade.menuEnabled$;
  public imageLoaded$ = this._facade.imageLoaded$;

  constructor(private _facade: ToolbarFacade) {}
}