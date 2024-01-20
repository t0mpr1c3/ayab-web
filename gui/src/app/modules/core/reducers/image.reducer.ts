import { createReducer, on } from '@ngrx/store';
import * as fromImage from '../actions/image.actions';
import { Scale } from '../models/scale.model';

export const featureKey = 'image';

export interface State {
  data: ImageData|null;
  scale: Scale;
}

export const initialState: State = {
  data: null,
  scale: { x: 1, y: 1 },
};

export const reducer = createReducer(
  initialState,

  on(fromImage.imageLoadedAction, (_, { data }) => ({ 
    data: data, 
    scale: { x: 1, y: 1 },
  })),

  on(fromImage.imageZoomAction, (state, { scale }) => ({ 
    ...state,
    scale: scale,
  })),
);

export const selectImage = (state: State) => state.data;
export const selectImageLoaded = (state: State) => !!state.data;
export const selectImageScale = (state: State) => state.scale;
export const selectImageXScale = (state: State) => state.scale.x;
export const selectImageYScale = (state: State) => state.scale.y;