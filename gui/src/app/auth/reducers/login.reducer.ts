import { createReducer, on } from '@ngrx/store';

import { loginSubmit } from '../actions/login.actions';
import { loginFailure, loginSuccess } from '../actions/auth-api.actions';

export const featureKey = 'login';

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
  on(loginSubmit, () => ({
    error: null,
    pending: true,
  })),
  on(loginSuccess, () => ({
    error: null,
    pending: false,
  })),
  on(loginFailure, (_, { error }) => ({
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;