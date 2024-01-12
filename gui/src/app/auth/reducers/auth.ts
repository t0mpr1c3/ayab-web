import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';

import { AuthUserState, authUserReducer, getUser, statusFeatureKey } from './auth-user.reducer';
import { LoginPageState, getError, getPending, loginPageFeatureKey, loginPageReducer } from './login-page.reducer';
import * as fromRoot from '../../reducers';

export const authFeatureKey = 'auth';

export interface AuthState {
  [statusFeatureKey]: AuthUserState;
  [loginPageFeatureKey]: LoginPageState;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [statusFeatureKey]: authUserReducer,
    [loginPageFeatureKey]: loginPageReducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  getUser
);

export const selectLoggedIn = createSelector(
  selectUser, 
  (user) => !!user
);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state) => state.loginPage
);

export const selectLoginPageError = createSelector(
  selectLoginPageState,
  getError
);

export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  getPending
);