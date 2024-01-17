import { Component, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as fromTest from '../test/actions/test.actions'

import { StartTestingService } from "../test/services/start-testing.service";
import { CancelService } from "../core/services/cancel.service";
import { MatDialogModule } from "@angular/material/dialog";
import { Subscription } from "rxjs";

/**
 * @title Test container component
 */
@Component({
  standalone: true,
  selector: 'test',
  template: ``,
  imports: [MatDialogModule],
})
export class TestComponent implements OnDestroy {
  private _testing = false;
  private _startTestingSubscription: Subscription;
  private _cancelSubscription: Subscription;

  constructor(
    private _store: Store<fromRoot.State>,
    private _startTestingService: StartTestingService,
    private _cancelService: CancelService,
  ) {
    this._startTestingSubscription = this._startTestingService.startTesting
      .subscribe(() => {
        this._testing = true;
        this.startTesting();
      });
    this._cancelSubscription = this._cancelService.cancel
      .subscribe(() => {
        if (this._testing) {
          this._testing = false;
          this.stopTesting();
        }
      });
  }

  ngOnDestroy(): void {
    this._startTestingSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */

  public startTesting(): void {
    this._store.dispatch(fromTest.startTesting());
  }

  public stopTesting(): void {
    this._store.dispatch(fromTest.stopTesting());
  }
}