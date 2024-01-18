import { Injectable } from "@angular/core";

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUser from '../actions/user.actions'

import { User } from "../../../../../shared/src/models/user.model";
import { RegistrationCredentials } from "../../../../../shared/src/models/credentials.model";

/**
 * @title Profile facade
 */
@Injectable()
export class ProfileFacade {
  constructor(
    private _store: Store<fromRoot.State>,
  ) {}
  
  public registration(credentials: RegistrationCredentials): void {
    this._store.dispatch(fromUser.registration({ credentials }));
  }
  
  public update(user: User): void {
    this._store.dispatch(fromUser.update({ user }));
  }
}
