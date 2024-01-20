import { createReducer, on } from '@ngrx/store';

import * as fromAuth from '../actions/auth.actions';

export const featureKey = 'init';

export interface State {
  booting: boolean;
}

export const initialState: State = {
  booting: true
};

export const bootedState: State = {
  booting: false
};

/*
export const reducer = createReducer(
  initialState,
  on(fromAuth.isLoggedOutAction, () => bootedState),
  on(fromAuth.isLoggedInAction, () => bootedState)
)
*/

export const getBooting = (state: State) => state.booting;