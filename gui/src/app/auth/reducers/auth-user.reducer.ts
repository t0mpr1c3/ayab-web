import { createReducer, on } from '@ngrx/store';

import { loginSuccess } from '../actions/auth-api.actions';
import { logout } from '../actions/auth.actions';
import { User } from '../models/user.model';

export const statusFeatureKey = 'status';

export interface AuthUserState {
  user: User | null;
}

export const initialState: AuthUserState = {
  user: null,
};

export const authUserReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logout, () => initialState)
);

export const getUser = (state: AuthUserState) => state.user;