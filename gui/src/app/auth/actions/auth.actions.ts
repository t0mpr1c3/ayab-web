import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../shared/src/models/user.model';

export const boot = createAction(
  '[Auth] Initialize auth state'
);
export const isLoggedIn = createAction(
  '[Auth] Is logged in',
  props<{ user: User }>()
);
export const isLoggedOut = createAction(
  '[Auth] Is logged out'
);
export const logout = createAction(
  '[Auth] Logout'
);