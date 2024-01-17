import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import { CancelService } from '../../../services/cancel.service';

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
  ]
})
export class CancelKnittingButtonComponent {
  public enabled$ = this._store.select(fromRoot.selectKnitting);

  constructor(
    private _store: Store<fromRoot.State>,
    private _cancelService: CancelService,
  ) {}

  public cancel(): void {
    this._cancelService.emit();
  }
}