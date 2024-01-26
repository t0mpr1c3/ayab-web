import { Action, ActionReducer, combineReducers } from '@ngrx/store';

import * as fromProf from './profile.reducer';
import * as fromLogin from './login.reducer';

// Extend intermediate state to include login state

export const featureKey = 'auth';

export interface State {
  [fromProf.featureKey]: fromProf.State;
  [fromLogin.featureKey]: fromLogin.State;
}

export const initialState: State = {
  [fromProf.featureKey]: fromProf.initialState,
  [fromLogin.featureKey]: fromLogin.initialState,
};

export const reducer = combineReducers({
  [fromProf.featureKey]: fromProf.reducer,
  [fromLogin.featureKey]: fromLogin.reducer,
}, initialState) as ActionReducer<State, Action>;

export const selectProfile = (state: State) => state[fromProf.featureKey];
export const selectLogin = (state: State) => state[fromLogin.featureKey];