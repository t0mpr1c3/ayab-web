import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { KnitFacade } from '../../../../knit/facade/knit.facade';

/** 
 * @title Knit button component
 **/
@Component({
  standalone: true,
  selector: 'knit-button',
  templateUrl: 'knit-button.component.html',
  styleUrls: ['knit-button.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
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