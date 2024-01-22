import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromReg from '../actions/registration.actions';

import { RegistrationCredentials } from '../../../../../../shared/src/models/credentials.model';

/**
 * @title Registration facade
 */
@Injectable()
export class RegistrationFacade {
  constructor(
    private _store: Store<fromRoot.State>,
  ) {}
  
  public registration(credentials: RegistrationCredentials): void {
    this._store.dispatch(fromReg.registrationAction({ credentials }));
  }
}
