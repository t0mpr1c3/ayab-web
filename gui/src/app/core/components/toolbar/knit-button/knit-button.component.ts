import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { StartKnittingService } from '../../../../knit/services/start-knitting.service';

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
  ]
})
export class KnitButtonComponent {
  public enabled$ = this._store.select(fromRoot.selectConfiguring);

  constructor(
    private _store: Store<fromRoot.State>,
    private _startKnittingService: StartKnittingService,
  ) {}

  public knit(): void {
    this._startKnittingService.emit();
    alert('Knitting is about to start') // FIXME
    const htmlContent = document.getElementById('content');
    if (htmlContent) {
      htmlContent.innerText = 'I am knitting!';
    }
  }
}