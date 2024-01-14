import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../../../shared/src/models/user.model';

export const isLoggedIn = createAction(
  '[Auth] IsLoggedIn',
  props<{ user: User }>()
);
export const isLoggedOut = createAction(
  '[Auth] IsLoggedOut'
);

export const logout = createAction(
  '[Auth] Logout'
);