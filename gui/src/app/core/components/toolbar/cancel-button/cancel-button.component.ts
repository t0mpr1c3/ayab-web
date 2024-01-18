import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { KnitFacade } from '../../../../knit/facade/knit.facade';

/** 
 * @title Cancel knitting button component
 **/
@Component({
  standalone: true,
  selector: 'cancel-button',
  templateUrl: 'cancel-button.component.html',
  styleUrls: ['cancel-button.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  providers: [KnitFacade],
})
export class CancelKnittingButtonComponent {
  constructor(private _facade: KnitFacade) {}

  public enabled$ = this._facade.cancelButtonEnabled$;

  public cancel(): void {
    this._facade.stopKnitting();
  }
}