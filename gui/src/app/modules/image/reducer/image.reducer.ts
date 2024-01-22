import { createReducer, on } from '@ngrx/store';
import * as fromImage from '../actions/image.actions';
import { Scale } from '../../toolbar/models/scale.model';
import { SerializedImageData } from '../model/serialized-image-data.model';

export const featureKey = 'image';

export interface State {
  data: SerializedImageData|null;
  scale: Scale;
  sceneCreated: boolean;
}

export const initialState: State = {
  data: null,
  scale: { x: 1, y: 1 },
  sceneCreated: false,
};

export const reducer = createReducer(
  initialState,

  on(fromImage.imageLoadedAction, (state, { data }) => ({ 
    ...state,
    data: data, 
    scale: { x: 1, y: 1 },
  })),

  on(fromImage.imageZoomAction, (state, { scale }) => ({ 
    ...state,
    scale: scale,
  })),

  on(fromImage.createSceneAction, state => ({ 
    ...state, 
    sceneCreated: true,
  })),
);

export const selectImage = (state: State) => state.data;
export const selectImageLoaded = (state: State) => !!state.data;
export const selectImageScale = (state: State) => state.scale;
export const selectImageXScale = (state: State) => state.scale.x;
export const selectImageYScale = (state: State) => state.scale.y;
export const selectSceneCreated = (state: State) => state.sceneCreated;