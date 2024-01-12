import { createReducer, on } from '@ngrx/store';

import * as knit from '../actions/knit.actions';

export const featureKey = 'knit';

export interface State {
  imageLoaded: boolean;
  knitting: boolean;
}

const initialState: State = {
  imageLoaded: false,
  knitting: false,
};

export const reducer = createReducer(
  initialState,
  on(knit.imageLoaded, () => ({ imageLoaded: true, knitting: false })),
  on(knit.startKnitting, state => {
    if (!state.imageLoaded) { 
      return state;
    }
    return { imageLoaded: true, knitting: true };
  }),
  on(knit.stopKnitting, state => {
    if (!state.imageLoaded) { 
      return state;
    }
    return { imageLoaded: true, knitting: false };
  }),
);

export const selectImageLoaded = (state: State) => state.imageLoaded;
export const selectKnitting = (state: State) => state.knitting;