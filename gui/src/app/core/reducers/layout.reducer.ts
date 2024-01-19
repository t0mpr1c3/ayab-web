import { createReducer, on } from '@ngrx/store';

import * as layout from '../actions/layout.actions';

export const featureKey = 'layout';

export interface State {
  showOptions: boolean;
}

const initialState: State = {
  showOptions: false,
};

export const reducer = createReducer(
  initialState,
  on(layout.hideOptionsAction, () => ({ showOptions: false })),
  on(layout.showOptionsAction, () => ({ showOptions: true })),
);

export const selectShowOptions = (state: State) => state.showOptions;