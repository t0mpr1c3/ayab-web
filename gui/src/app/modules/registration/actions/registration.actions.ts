import { createAction, props } from '@ngrx/store';
import { RegistrationCredentials } from '../../../../../../shared/src/models/credentials.model';

export const registrationAction = createAction(
  '[Registration] Register new user',
  props<{ credentials: RegistrationCredentials }>()
);
export const confirmRegistrationAction = createAction(
  '[Registration] Confirm registration',
  props<{ message: string, success: boolean }>()
);