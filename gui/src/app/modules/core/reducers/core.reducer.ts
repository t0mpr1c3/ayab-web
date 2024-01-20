import { Action, ActionReducer, combineReducers } from '@ngrx/store';

import * as fromImage from './image.reducer';
import * as fromLayout from './layout.reducer';

// Extend intermediate state to include login state

export const featureKey = 'core';

export interface State {
  [fromImage.featureKey]: fromImage.State;
  [fromLayout.featureKey]: fromLayout.State;
}

export const initialState: State = {
  [fromImage.featureKey]: fromImage.initialState,
  [fromLayout.featureKey]: fromLayout.initialState,
};

export const reducer = combineReducers({
  [fromImage.featureKey]: fromImage.reducer,
  [fromLayout.featureKey]: fromLayout.reducer,
}, initialState) as ActionReducer<State, Action>;

export const getImage = (state: State) => state[fromImage.featureKey];
export const getLayout = (state: State) => state[fromLayout.featureKey];