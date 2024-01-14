import { Component } from "@angular/core";

import { Store } from '@ngrx/store';
import * as root from '../reducers';
import * as authApi from '../core/services/auth/actions/auth-api.actions';
import * as login from '../core/services/auth/actions/login.actions';
import * as auth from '../core/services/auth/actions/auth.actions';

import { User } from "../../../../shared/src/models/user.model";
import { LoginCredentials } from "../../../../shared/src/models/credentials.model";
import { MyAYABMenuComponent } from "../core/components/toolbar/my-ayab-menu/my-ayab-menu.component";

/**
 * @title Profile component
 */
@Component({
  standalone: true,
  selector: 'profile',
  template: `<my-ayab-menu></my-ayab-menu>`,
  imports: [MyAYABMenuComponent],
})
export class ProfileComponent {
  constructor(private _store: Store<root.State>) {}

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of the
   * application.
   */
  
  loginSuccess(user: User): void {
    this._store.dispatch(authApi.loginSuccess({ user }));
  }
  
  loginFailure(error: any): void {
    this._store.dispatch(authApi.loginFailure({ error }));
  }
  
  loginSubmit(credentials: LoginCredentials): void {
    this._store.dispatch(login.loginSubmit({ credentials }));
  }
  
  logout(): void {
    this._store.dispatch(auth.logout());
  }
}
