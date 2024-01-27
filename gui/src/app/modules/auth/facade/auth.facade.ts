import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromLogin from '../actions/login.actions';
import * as fromAuth from '../actions/auth.actions';

import { LoginCredentials } from '../../../../../../shared/src/models/credentials.model';

/**
 * @title Authentication facade
 */
@Injectable()
export default class AuthFacade {
  constructor(
    private _store: Store<fromRoot.State>,
  ) {}
  
  public loginPending$ = this._store.select(fromRoot.selectLoginPending);
  public loginError$ = this._store.select(fromRoot.selectLoginError);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public menuEnabled$ = this._store.select(fromRoot.selectMenuEnabled);

  public boot(): void {
    this._store.dispatch(fromAuth.bootAction());
  }
  
  public submitLogin(credentials: LoginCredentials): void {
    this._store.dispatch(fromLogin.submitLoginAction({ credentials }));
  }
  
  public cancelLogin(): void {
    this._store.dispatch(fromLogin.cancelLoginAction());
  }
  
  public logout(): void {
    this._store.dispatch(fromAuth.logoutAction());
  }
}