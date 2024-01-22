import { createAction, props } from '@ngrx/store';
import { Settings } from '../../../../../../shared/src/models/settings.model';

export const updateSettingsAction = createAction(
  '[User] Update settings',
  props<{ settings: Settings }>()
);