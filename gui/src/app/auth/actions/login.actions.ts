import { createAction, props } from '@ngrx/store';
import { LoginCredentials } from '../../../../../shared/src/models/credentials.model';

export const loginSubmit = createAction(
  '[Login] Login submit',
  props<{ credentials: LoginCredentials }>()
);