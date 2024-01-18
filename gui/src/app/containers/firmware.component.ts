import { Component, OnDestroy } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as fromFirmware from '../firmware/actions/firmware.actions'

import { StartFirmwareService } from "../firmware/services/start-firmware.service";
import { CancelService } from "../core/services/cancel.service";
import { Subscription } from "rxjs";

/**
 * @title Firmware upload container component
 */
@Component({
  standalone: true,
  selector: 'firmware',
  template: ``,
  imports: [MatDialogModule],
})
export class FirmwareComponent implements OnDestroy {
  private _firmware = false;
  private _startFirmwareSubscription: Subscription;
  private _cancelSubscription: Subscription;

  constructor(
    private _store: Store<fromRoot.State>,
    private _startFirmwareService: StartFirmwareService,
    private _cancelService: CancelService,
  ) {
    this._startFirmwareSubscription = this._startFirmwareService.startFirmware
      .subscribe(() => {
        this._firmware = true;
        this.startFirmware();
      });
    this._cancelSubscription = this._cancelService.cancel
      .subscribe(() => {
        if (this._firmware) {
          this._firmware = false;
          this.stopFirmware();
        }
      });
  }

  ngOnDestroy(): void {
    this._startFirmwareSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */

  public startFirmware(): void {
    this._store.dispatch(fromFirmware.startFirmware());
  }

  public stopFirmware(): void {
    this._store.dispatch(fromFirmware.stopFirmware());
  }
}