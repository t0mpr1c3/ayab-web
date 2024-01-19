import { createReducer, on } from '@ngrx/store';

import * as fromImage from '../actions/image.actions';

export const featureKey = 'image';

export interface State {
  loaded: boolean;
}

export const initialState: State = {
  loaded: false,
};

export const reducer = createReducer(
  initialState,
  on(fromImage.imageLoadedAction, () => ({ loaded: true })),
);

export const selectImageLoaded = (state: State) => state.loaded;