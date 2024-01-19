import { createReducer, on } from '@ngrx/store';

import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromAuth from '../actions/auth.actions';
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
  on(fromAuthApi.loginSuccessAction, (_, { user }) => ({ user: user })),
  on(fromAuth.logoutAction, () => initialState)
);
*/

export const getUser = (state: State) => state.user;