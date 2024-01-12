import { createReducer, on } from '@ngrx/store';

import { login } from '../actions/login-page.actions';
import { loginFailure, loginSuccess } from '../actions/auth-api.actions';

export const loginPageFeatureKey = 'loginPage';

export interface LoginPageState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginPageState = {
  error: null,
  pending: false,
};

export const loginPageReducer = createReducer(
  initialState,
  on(login, (state) => ({
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

export const getError = (state: LoginPageState) => state.error;
export const getPending = (state: LoginPageState) => state.pending;