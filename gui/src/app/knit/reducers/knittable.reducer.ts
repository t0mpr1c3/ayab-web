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
  
  on(imageAction.imageLoadedAction, (state, data) => ({
    ...state,
    [fromImage.featureKey]: {
      data: data.data,
      scale: { x: 1, y: 1 } // FIXME set scale appropriate to image size
    }
  })),
  
  on(imageAction.imageZoomAction, (state, scale) => ({ 
    ...state,
    [fromImage.featureKey]: { 
      data: state[fromImage.featureKey].data, 
      scale: { x: scale.x, y: scale.y }
    }
  })),
  
  on(knitAction.startKnittingAction, state => (
    !state[fromImage.featureKey].data ?
      state : {
        ...state, 
        [fromKnit.featureKey]: { knitting: true }
      }
  )),
  
  on(knitAction.stopKnittingAction, state => ({ 
    ...state, 
    [fromKnit.featureKey]: { knitting: false }
  })),
);

export const selectImageState  = (state: State) => state[fromImage.featureKey];
export const selectKnittingState  = (state: State) => state[fromKnit.featureKey];