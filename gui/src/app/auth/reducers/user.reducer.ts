import { createReducer, on } from '@ngrx/store';

import { loginSuccess } from '../actions/auth-api.actions';
import { logout } from '../actions/auth.actions';
import { User } from '../../../../../shared/src/models/user.model';

export const featureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

/*
export const reducer = createReducer(
  initialState,
  on(loginSuccess, (_, { user }) => ({ user: user })),
  on(logout, () => initialState)
);
*/

export const getUser = (state: State) => state.user;