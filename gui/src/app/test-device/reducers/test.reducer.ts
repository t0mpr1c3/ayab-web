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
  on(test.startTestingAction, () => ({ testing: true })),
  on(test.stopTestingAction, () => ({ testing: false })),
);

export const selectTesting = (state: State) => state.testing;