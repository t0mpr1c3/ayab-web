import { createReducer, on } from '@ngrx/store';
import * as fromImage from '../actions/image.actions';

export const featureKey = 'image';

export interface State {
  data: ImageData|null;
  scale: { x: number; y: number; };
}

export const initialState: State = {
  data: null,
  scale: { x: 1, y: 1 },
};
/*
export const reducer = createReducer(
  initialState,
  on(fromImage.imageLoadedAction, (state, { img }) => ({ ...state, img: img, scale: 1 })),
  on(fromImage.imageZoomAction, (state, { scale }) => ({ ...state, scale: scale })),
);
*/
export const selectImage = (state: State) => state.data;
export const selectImageLoaded = (state: State) => !!state.data;
export const selectImageScale = (state: State) => state.scale;
export const selectImageXScale = (state: State) => state.scale.x;
export const selectImageYScale = (state: State) => state.scale.y;