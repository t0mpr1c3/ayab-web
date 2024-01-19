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
  on(fromKnit.startKnittingAction, () => ({ knitting: true })),
  on(fromKnit.stopKnittingAction, () => ({ knitting: false })),
);
*/

export const selectKnitting = (state: State) => state.knitting;