import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
} from '@ngrx/store';

import * as user from './user.reducer';
import * as login from './login.reducer';
import * as root from '../../../../reducers';

export const featureKey = 'auth';

export interface AuthState {
  [user.featureKey]: user.State;
  [login.featureKey]: login.State;
}

export interface State extends root.State {
  [featureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [user.featureKey]: user.reducer,
    [login.featureKey]: login.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  user.getUser
);

export const selectLoggedIn = createSelector(
  selectUser, 
  (user) => !!user
);

export const selectLoginState = createSelector(
  selectAuthState,
  (state) => state.loginPage
);

export const selectLoginError = createSelector(
  selectLoginState,
  login.getError
);

export const selectLoginPending = createSelector(
  selectLoginState,
  login.getPending
);