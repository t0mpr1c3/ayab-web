import { createAction, props } from '@ngrx/store';

import { LoginCredentials } from '../../../../../../shared/src/models/credentials.model';

export const submitLoginAction = createAction(
  '[Login] Submit login',
  props<{ credentials: LoginCredentials }>()
);
export const cancelLoginAction = createAction(
  '[Auth] Cancel login'
);