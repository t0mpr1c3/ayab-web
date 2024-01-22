import { createReducer, on } from '@ngrx/store';

import * as fromBoot from './boot.reducer';
import * as fromUser from './user.reducer';
import * as fromAuth from '../actions/auth.actions';
import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromSettings from '../../settings/actions/settings.actions';

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

  on(fromAuth.isLoggedOutAction, state => (
    !state[fromBoot.featureKey].booting ? 
      state : 
      loggedOut
  )),

  on(fromAuth.isLoggedInAction, (state, { user }) => (
    !state[fromBoot.featureKey].booting ? 
      state : 
      {
        [fromBoot.featureKey]: fromBoot.bootedState,
        [fromUser.featureKey]: { user: user },
      }
  )),

  on(fromAuthApi.loginSuccessAction, (state, { user }) => ({ 
    ...state,
    [fromUser.featureKey]: { user: user },
  })),

  on(fromSettings.updateSettingsAction,  (state, { settings }) => ({ 
    ...state,
    [fromUser.featureKey]: { 
      user: {
        ...state[fromUser.featureKey].user!,
        settings: settings 
      } 
    },
  })),
  
  on(fromAuth.logoutAction, () => loggedOut),
);

export const getInit = (state: State) => state[fromBoot.featureKey];
export const getStatus = (state: State) => state[fromUser.featureKey];