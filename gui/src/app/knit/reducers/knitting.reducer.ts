import { createReducer, on } from '@ngrx/store';

import * as fromKnit from '../actions/knit.actions';

export const featureKey = 'knitting';

export interface State {
  knitting: boolean;
}

export const initialState: State = {
  knitting: false,
};

/*
export const reducer = createReducer(
  initialState,
  on(fromKnit.startKnitting, () => ({ knitting: true })),
  on(fromKnit.stopKnitting, () => ({ knitting: false })),
);
*/

export const selectKnitting = (state: State) => state.knitting;