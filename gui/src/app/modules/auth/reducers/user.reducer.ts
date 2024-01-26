import { createReducer, on } from '@ngrx/store';

import * as fromAuthApi from '../actions/auth-api.actions';
import * as fromAuth from '../actions/auth.actions';
import { User } from '../../../../../../shared/src/models/user.model';
import { MachineEnum } from '../../../../../../shared/src/models/machine-enum.model';

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

export const selectUser = (state: State) => state.user;
export const selectSettings = (state: State) => 
  state.user ?
    state.user.settings as any : 
    null;
export const selectMachineSetting = (state: State) => 
  state.user ? 
    (state.user.settings as any).machine : 
    null;
export const selectMachineWidth = (state: State) => 
  state.user && (state.user.settings as any).machine === MachineEnum.KH270 ? 
    112 : 
    200;