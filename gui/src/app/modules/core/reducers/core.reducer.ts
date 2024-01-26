import { Action, ActionReducer, combineReducers } from '@ngrx/store';

import * as fromImage from '../../image/reducer/image.reducer';
import * as fromLayout from './layout.reducer';
import * as fromOptions from '../../options/reducers/options.reducer';

export const featureKey = 'core';

export interface State {
  [fromImage.featureKey]: fromImage.State;
  [fromLayout.featureKey]: fromLayout.State;
  [fromOptions.featureKey]: fromOptions.State;
}

export const initialState: State = {
  [fromImage.featureKey]: fromImage.initialState,
  [fromLayout.featureKey]: fromLayout.initialState,
  [fromOptions.featureKey]: fromOptions.initialState,
};

export const reducer = combineReducers({
  [fromImage.featureKey]: fromImage.reducer,
  [fromLayout.featureKey]: fromLayout.reducer,
  [fromOptions.featureKey]: fromOptions.reducer,
}, initialState) as ActionReducer<State, Action>;

export const getImage = (state: State) => state[fromImage.featureKey];
export const getLayout = (state: State) => state[fromLayout.featureKey];