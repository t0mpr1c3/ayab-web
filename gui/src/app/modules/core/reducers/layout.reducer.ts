import { createReducer, on } from '@ngrx/store';

import * as layout from '../actions/layout.actions';

export const featureKey = 'layout';

export interface State {
  optionsShown: boolean;
  sceneCreated: boolean;
}

export const initialState: State = {
  optionsShown: false,
  sceneCreated: false,
};

export const reducer = createReducer(
  initialState,
  on(layout.hideOptionsAction, state => ({ ...state, optionsShown: false })),
  on(layout.showOptionsAction, state => ({ ...state, optionsShown: true })),
);

export const selectOptionsShown = (state: State) => state.optionsShown;