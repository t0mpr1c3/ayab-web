import { createReducer, on } from '@ngrx/store';

import * as fromLogin from '../actions/login.actions';
import * as fromAuthApi from '../actions/auth-api.actions';

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

  on(fromLogin.submitLoginAction, () => ({
    error: null,
    pending: true,
  })),

  on(fromLogin.cancelLoginAction, () => ({
    error: null,
    pending: false,
  })),

  on(fromAuthApi.loginSuccessAction, () => ({
    error: null,
    pending: false,
  })),

  on(fromAuthApi.loginFailureAction, (_, { error }) => ({
    error,
    pending: false,
  }))
);

export const selectError = (state: State) => state.error;
export const selectPending = (state: State) => state.pending;