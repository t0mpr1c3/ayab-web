import { createReducer, on } from '@ngrx/store';

import * as fromImage from './image.reducer';
import * as fromKnit from '../../knit/reducers/knit.reducer';
import * as fromTest from '../../test/reducers/test.reducer';
import * as imageAction from '../actions/image.actions';
import * as knitAction from '../../knit/actions/knit.actions';
import * as testAction from '../../test/actions/test.actions';

export const featureKey = 'arena';

export interface State {
  [fromImage.featureKey]: fromImage.State;
  [fromKnit.featureKey]: fromKnit.State;
  [fromTest.featureKey]: fromTest.State;
}

export const initialState: State = {
  [fromImage.featureKey]: fromImage.initialState,
  [fromKnit.featureKey]: fromKnit.initialState,
  [fromTest.featureKey]: fromTest.initialState,
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
  
  on(testAction.startTesting, state => ({ 
        ...state, 
        [fromTest.featureKey]: { testing: true }
  })),
  
  on(testAction.stopTesting, state => ({ 
      ...state, 
      [fromTest.featureKey]: { testing: false }
  })),
);

export const selectImage  = (state: State) => state.image;
export const selectKnit  = (state: State) => state.knit;
export const selectTest  = (state: State) => state.test;