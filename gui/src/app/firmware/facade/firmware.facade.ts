import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import * as fromFirmware from '../actions/firmware.actions';

/**
 * @title Firmware facade
 */
@Injectable()
export class FirmwareFacade {
  constructor(private _store: Store<fromRoot.State>) {}

  public startFirmware(): void {
    this._store.dispatch(fromFirmware.startFirmware());
  }

  public stopFirmware(): void {
    this._store.dispatch(fromFirmware.stopFirmware());
  }
}