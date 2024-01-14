import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers,
  createReducer,
  on,
} from '@ngrx/store';

import * as user from './user.reducer';
import * as login from './login.reducer';
import { isLoggedIn, isLoggedOut, logout } from '../actions/auth.actions';
import { loginSuccess } from '../actions/auth-api.actions';

export const featureKey = 'auth';

export interface State {
  booting: boolean;
  [user.featureKey]: user.State;
  [login.featureKey]: login.State;
}

export const initialState: State = {
  booting: true,
  [user.featureKey]: user.initialState,
  [login.featureKey]: login.initialState,
};

export const loggedOut: State = {
  booting: false,
  [user.featureKey]: user.initialState,
  [login.featureKey]: login.initialState,
};

export const reducer = createReducer(
  initialState,
  on(isLoggedOut, state => (!state.booting ? state : loggedOut)),
  on(isLoggedIn, (state, { user }) => (!state.booting ? state : {
    ...state,
    booting: false,
    user,
    ...login.initialState,
  })),
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logout, () => loggedOut),
);

export function reducers(state: State | undefined, action: Action) {
  return combineReducers({
    [user.featureKey]: user.reducer,
    [login.featureKey]: login.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State>(featureKey);

export const selectUserState = createSelector(
  selectAuthState,
  (state) => state[user.featureKey]
);

export const selectUser = createSelector(
  selectUserState,
  user.getUser
);

export const selectLoggedIn = createSelector(
  selectUser, 
  (user) => !!user
);

export const selectLoginState = createSelector(
  selectAuthState,
  (state) => state[login.featureKey]
);

export const selectLoginError = createSelector(
  selectLoginState,
  login.getError
);

export const selectLoginPending = createSelector(
  selectLoginState,
  login.getPending
);