import { createReducer, on } from '@ngrx/store';

import * as fromBoot from './boot.reducer';
import * as fromUser from './user.reducer';
import * as fromAuth from '../actions/auth.actions';
import * as fromAuthApi from '../actions/auth-api.actions';

// Create intermediate state from boot and user states

export const featureKey = 'profile';

export interface State {
  [fromBoot.featureKey]: fromBoot.State;
  [fromUser.featureKey]: fromUser.State;
}

export const initialState: State = {
  [fromBoot.featureKey]: fromBoot.initialState,
  [fromUser.featureKey]: fromUser.initialState,
};

const loggedOut: State = {
  [fromBoot.featureKey]: fromBoot.bootedState,
  [fromUser.featureKey]: fromUser.initialState,
};

export const reducer = createReducer(
  initialState,

  on(fromAuth.isLoggedOut, state => (
    !state[fromBoot.featureKey].booting ? 
      state : 
      loggedOut
  )),

  on(fromAuth.isLoggedIn, (state, { user }) => (
    !state[fromBoot.featureKey].booting ? 
      state : 
      {
        [fromBoot.featureKey]: fromBoot.bootedState,
        [fromUser.featureKey]: { user: user },
      }
  )),

  on(fromAuthApi.loginSuccess, (state, { user }) => ({ 
    ...state,
    [fromUser.featureKey]: { user: user },
  })),
  
  on(fromAuth.logout, () => loggedOut),
);

export const getInit = (state: State) => state[fromBoot.featureKey];
export const getStatus = (state: State) => state[fromUser.featureKey];