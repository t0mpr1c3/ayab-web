import { props, createAction } from '@ngrx/store';
import { User } from '../../../../../shared/src/models/user.model';

export const loginSuccess = createAction(
  '[Auth/API] Login success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Auth/API] Login failure',
  props<{ error: any }>()
);