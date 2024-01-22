import { Component } from '@angular/core';
import { ToolbarFacade } from '../../facade/toolbar.facade';

/*
 * @title Tools menu component
 */
 @Component({
  selector: 'tools-menu',
  templateUrl: 'tools-menu.component.html',
  styleUrls: ['tools-menu.component.css'],
})
export class ToolsMenuComponent {
  public enabled$ = this._facade.menuEnabled$;

  constructor(
    private _facade: ToolbarFacade,
  ) {}
}
