import { Component } from '@angular/core';

import KnitFacade from '../../../knit/facade/knit.facade';

/** 
 * @title Cancel knitting button component
 **/
@Component({
  selector: 'cancel-button',
  templateUrl: 'cancel-button.component.html',
  styleUrls: ['cancel-button.component.css'],
  providers: [KnitFacade],
})
export default class CancelKnittingButtonComponent {
  constructor(private _facade: KnitFacade) {}

  public enabled$ = this._facade.cancelButtonEnabled$;

  public cancel(): void {
    this._facade.stopKnitting();
  }
}