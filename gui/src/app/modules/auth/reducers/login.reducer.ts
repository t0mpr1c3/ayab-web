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
  on(fromLogin.loginSubmitAction, () => ({
    error: null,
    pending: true,
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

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;