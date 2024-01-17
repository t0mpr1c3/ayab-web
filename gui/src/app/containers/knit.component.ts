import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as fromKnit from '../knit/actions/knit.actions'

import { StartKnittingService } from "../knit/services/start-knitting.service";
import { CancelService } from "../core/services/cancel.service";
import { MatDialogModule } from "@angular/material/dialog";

/**
 * @title Knit container component
 */
@Component({
  standalone: true,
  selector: 'knit',
  template: ``,
  imports: [MatDialogModule],
})
export class KnitComponent {
  private _knitting = false;

  constructor(
    private _store: Store<fromRoot.State>,
    private _startKnittingService: StartKnittingService,
    private _cancelService: CancelService,
  ) {
    this._startKnittingService.startKnitting.subscribe(() => {
      this._knitting = true;
      this.startKnitting();
    })
    this._cancelService.cancel.subscribe(() => {
      if (this._knitting) {
        this._knitting = false;
        this.stopKnitting();
      }
    })
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */

  public startKnitting(): void {
    this._store.dispatch(fromKnit.startKnitting());
  }

  public stopKnitting(): void {
    this._store.dispatch(fromKnit.stopKnitting());
  }
}