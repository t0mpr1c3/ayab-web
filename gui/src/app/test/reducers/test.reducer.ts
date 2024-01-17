import { createReducer, on } from '@ngrx/store';

import * as fromTest from '../actions/test.actions';

export const featureKey = 'test';

export interface State {
  testing: boolean;
}

export const initialState: State = {
  testing: false,
};

/*
export const reducer = createReducer(
  initialState,
  on(fromTest.startTesting, () => ({ testing: true })),
  on(fromTest.stopTesting, () => ({ testing: false })),
);
*/

export const selectTesting = (state: State) => state.testing;