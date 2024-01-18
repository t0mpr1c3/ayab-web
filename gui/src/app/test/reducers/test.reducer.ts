import { createReducer, on } from '@ngrx/store';

import * as test from '../actions/test.actions';

export const featureKey = 'test';

export interface State {
  testing: boolean;
}

const initialState: State = {
  testing: false,
};

export const reducer = createReducer(
  initialState,
  on(test.startTesting, () => ({ testing: true })),
  on(test.stopTesting, () => ({ testing: false })),
);

export const selectTesting = (state: State) => state.testing;