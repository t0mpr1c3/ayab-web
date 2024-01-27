import { createAction, props } from '@ngrx/store';

import User from '../../../../../../shared/src/models/user.model';

export const bootAction = createAction(
  '[Auth] Initialize auth state'
);
export const idleTimeoutAction = createAction(
  '[Auth] Idle timeout'
);
export const isLoggedInAction = createAction(
  '[Auth] Is logged in',
  props<{ user: User }>()
);
export const isLoggedOutAction = createAction(
  '[Auth] Is logged out'
);
export const logoutAction = createAction(
  '[Auth] Logout'
);