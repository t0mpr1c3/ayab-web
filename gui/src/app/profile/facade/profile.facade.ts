import { Injectable } from "@angular/core";

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUser from '../actions/user.actions'

import { RegistrationCredentials } from "../../../../../shared/src/models/credentials.model";
import { Settings } from "../../../../../shared/src/models/settings.model";

/**
 * @title Profile facade
 */
@Injectable()
export class ProfileFacade {
  constructor(
    private _store: Store<fromRoot.State>,
  ) {}
  
  public registration(credentials: RegistrationCredentials): void {
    this._store.dispatch(fromUser.registrationAction({ credentials }));
  }
  
  public updateSettings(settings: Settings): void {
    this._store.dispatch(fromUser.updateSettingsAction({ settings: settings }));
  }
}
