import { createAction, props } from '@ngrx/store';
import { Scale } from '../../toolbar/models/scale.model';
import { SerializedImageData } from '../model/serialized-image-data.model';
import { Mirrors } from '../model/mirrors.model';

export const createSceneAction = createAction(
  '[Image] Create Scene',
);
export const loadImageAction = createAction(
  '[Image] Load image',
  props<{ data: SerializedImageData }>(),
)
export const zoomImageAction = createAction(
  '[Image] Zoom image',
  props<{ scale: Scale }>(),
)
export const invertImageAction = createAction(
  '[Image] Invert image',
)
export const stretchImageAction = createAction(
  '[Image] Stretch image',
  props<{ scale: Scale }>(),
)
export const repeatImageAction = createAction(
  '[Image] Repeat image',
  props<{ scale: Scale }>(),
)
export const reflectImageAction = createAction(
  '[Image] Reflect image',
  props<{ mirrors: Mirrors }>(),
)
export const hFlipImageAction = createAction(
  '[Image] Flip image horizontally',
)
export const vFlipImageAction = createAction(
  '[Image] Flip image vertically',
)
export const rotateImageLeftAction = createAction(
  '[Image] Rotate image left',
)
export const rotateImageRightAction = createAction(
  '[Image] Rotate image right',
)