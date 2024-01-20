import { Component } from '@angular/core';

import { KnitFacade } from '../../../knit/facade/knit.facade';

/** 
 * @title Knit button component
 **/
@Component({
  selector: 'knit-button',
  templateUrl: 'knit-button.component.html',
  styleUrls: ['knit-button.component.css'],
  providers: [KnitFacade],
})
export class KnitButtonComponent {
  constructor(private _facade: KnitFacade) {}

  public enabled$ = this._facade.knitButtonEnabled$;

  public knit(): void {
    this._facade.startKnitting();
    alert('Knitting is about to start') // FIXME
    const htmlContent = document.getElementById('content');
    if (htmlContent) {
      htmlContent.innerText = 'I am knitting!';
    }
  }
}