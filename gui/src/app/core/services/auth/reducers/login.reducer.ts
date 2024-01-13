import { createReducer, on } from '@ngrx/store';

import { loginSubmit } from '../actions/login-page.actions';
import { loginFailure, loginSuccess } from '../actions/auth-api.actions';

export const featureKey = 'loginPage';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const reducer = createReducer(
  initialState,
  on(loginSubmit, (state) => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(loginSuccess, (state) => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;