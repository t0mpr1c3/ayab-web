import { createAction, props } from '@ngrx/store';
import { Scale } from '../../toolbar/models/scale.model';
import { SerializedImageData } from '../model/serialized-image-data.model';

export const imageLoadedAction = createAction(
  '[Image] Image loaded',
  props<{ data: SerializedImageData }>(),
)
export const imageZoomAction = createAction(
  '[Image] Zoom image',
  props<{ scale: Scale }>(),
)
export const createSceneAction = createAction('[Image] Create Scene');