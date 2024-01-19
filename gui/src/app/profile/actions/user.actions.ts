import { createAction, props } from '@ngrx/store';
import { RegistrationCredentials } from '../../../../../shared/src/models/credentials.model';
import { Settings } from '../../../../../shared/src/models/settings.model';

export const idleTimeoutAction = createAction(
  '[User] Idle timeout'
);
export const registrationAction = createAction(
  '[User] Register new user',
  props<{ credentials: RegistrationCredentials }>()
);
export const confirmRegistrationAction = createAction(
  '[User] Confirm registration',
  props<{ message: string, success: boolean }>()
);
export const updateSettingsAction = createAction(
  '[User] Update settings',
  props<{ settings: Settings }>()
);