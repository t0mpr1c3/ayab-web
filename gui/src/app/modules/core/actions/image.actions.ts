import { createAction, props } from "@ngrx/store";
import { Scale } from "../models/scale.model";

export const imageLoadedAction = createAction(
  '[Image] Image loaded',
  props<{ data: ImageData }>(),
)
export const imageZoomAction = createAction(
  '[Image] Image zoomed',
  props<{ scale: Scale }>(),
)