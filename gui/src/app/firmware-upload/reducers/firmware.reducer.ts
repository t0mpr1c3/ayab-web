import { createReducer, on } from '@ngrx/store';

import * as fromFirmware from '../actions/firmware.actions';

export const featureKey = 'firmware';

export interface State {
  uploading: boolean;
}

export const initialState: State = {
  uploading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromFirmware.startFirmware, () => ({ uploading: true })),
  on(fromFirmware.stopFirmware, () => ({ uploading: false })),
);

export const selectFirmware = (state: State) => state.uploading;