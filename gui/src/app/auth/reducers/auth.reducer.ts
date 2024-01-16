import { createReducer, on } from '@ngrx/store';

import * as fromUser from './user.reducer';
import * as fromLogin from './login.reducer';
import { isLoggedIn, isLoggedOut, logout } from '../actions/auth.actions';
import { loginSuccess } from '../actions/auth-api.actions';

export const authFeatureKey = 'authentication';
export const featureKey = 'auth';

export interface AuthState {
  booting: boolean;
}

const initialAuthState: AuthState = {
  booting: true
};

const bootedAuthState: AuthState = {
  booting: false
};

export interface State {
  [authFeatureKey]: AuthState;
  [fromUser.featureKey]: fromUser.State;
  [fromLogin.featureKey]: fromLogin.State;
}

export const initialState: State = {
  [authFeatureKey]: initialAuthState,
  [fromUser.featureKey]: fromUser.initialState,
  [fromLogin.featureKey]: fromLogin.initialState,
};

export const loggedOut: State = {
  [authFeatureKey]: bootedAuthState,
  [fromUser.featureKey]: fromUser.initialState,
  [fromLogin.featureKey]: fromLogin.initialState,
};

export const reducer = createReducer(
  initialState,
  on(isLoggedOut, state => (
    !state[authFeatureKey].booting ? 
      state : 
      loggedOut)),
  on(isLoggedIn, (state, { user }) => (
    !state[authFeatureKey].booting ? 
      state : 
      {
        ...state,
        [authFeatureKey]: bootedAuthState,
        [fromUser.featureKey]: { user: user },
        ...fromLogin.initialState,
      })),
  on(loginSuccess, (state, { user }) => ({ 
    ...state,
    [fromUser.featureKey]: { user: user },
  })),
  on(logout, () => loggedOut),
);