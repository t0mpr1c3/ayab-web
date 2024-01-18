import { Component } from "@angular/core";

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromAuthApi from '../auth/actions/auth-api.actions';
import * as fromLogin from '../auth/actions/login.actions';
import * as fromAuth from '../auth/actions/auth.actions';
import * as fromUser from '../profile/actions/user.actions'

import { SubmitService } from "../core/services/submit.service";
import { User } from "../../../../shared/src/models/user.model";
import { LoginCredentials, RegistrationCredentials } from "../../../../shared/src/models/credentials.model";

/**
 * @title Profile container component
 */
@Component({
  standalone: true,
  selector: 'profile',
  template: ``,
})
export class ProfileComponent {
  constructor(
    private _store: Store<fromRoot.State>,
    private _submitService: SubmitService,
  ) {
    this._submitService.submit.subscribe(signal => {
      switch(signal.action) {
        case fromUser.registration:
          this.registration(signal.payload.credentials);
          break;
        case fromLogin.loginSubmit:
          this.loginSubmit(signal.payload.credentials);
          break;
        case fromUser.update:
          this.update(signal.payload.user);
          break;
        case fromAuth.logout:
          this.logout();
          break;
        default:
          break;
      }
    })
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */
  
  public loginSuccess(user: User): void {
    this._store.dispatch(fromAuthApi.loginSuccess({ user }));
  }
  
  public loginFailure(error: any): void {
    this._store.dispatch(fromAuthApi.loginFailure({ error }));
  }
  
  public loginSubmit(credentials: LoginCredentials): void {
    this._store.dispatch(fromLogin.loginSubmit({ credentials }));
  }
  
  public logout(): void {
    this._store.dispatch(fromAuth.logout());
  }
  
  public registration(credentials: RegistrationCredentials): void {
    this._store.dispatch(fromUser.registration({ credentials }));
  }
  
  public update(user: User): void {
    this._store.dispatch(fromUser.update({ user }));
  }
  
  public idleTimeout(): void {
    this._store.dispatch(fromUser.idleTimeout());
  }
}
