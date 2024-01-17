import { createAction, props } from '@ngrx/store';
import { RegistrationCredentials } from '../../../../../shared/src/models/credentials.model';
import { User } from '../../../../../shared/src/models/user.model';

export const idleTimeout = createAction(
  '[User] Idle timeout'
);
export const registration = createAction(
  '[User] Register new user',
  props<{ credentials: RegistrationCredentials }>()
);
export const confirmRegistration = createAction(
  '[User] Confirm registration',
  props<{ message: string, success: boolean }>()
);
export const update = createAction(
  '[User] Update user',
  props<{ user: User }>()
);