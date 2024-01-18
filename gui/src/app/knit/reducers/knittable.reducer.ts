import { createReducer, on } from '@ngrx/store';
import * as fromImage from '../../core/reducers/image.reducer';
import * as fromKnit from './knitting.reducer';
import * as imageAction from '../../core/actions/image.actions';
import * as knitAction from '../actions/knit.actions';

export const featureKey = 'knittable';

export interface State {
  [fromImage.featureKey]: fromImage.State;
  [fromKnit.featureKey]: fromKnit.State;
}

export const initialState: State = {
  [fromImage.featureKey]: fromImage.initialState,
  [fromKnit.featureKey]: fromKnit.initialState,
};

export const reducer = createReducer(
  initialState,
  
  on(imageAction.imageLoaded, state => ({ 
    ...state,
    [fromImage.featureKey]: { loaded: true }
  })),
  
  on(knitAction.startKnitting, state => (
    !state[fromImage.featureKey].loaded ?
      state : { 
        ...state, 
        [fromKnit.featureKey]: { knitting: true }
      }
  )),
  
  on(knitAction.stopKnitting, state => ({ 
      ...state, 
      [fromKnit.featureKey]: { knitting: false }
  })),
);

export const selectImage  = (state: State) => state.image;
export const selectKnitting  = (state: State) => state.knitting;