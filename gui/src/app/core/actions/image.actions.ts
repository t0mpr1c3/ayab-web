import { createAction, props } from "@ngrx/store";

export const imageLoadedAction = createAction(
  '[Image] Image loaded',
  props<{ data: ImageData }>(),
)
export const imageZoomAction = createAction(
  '[Image] Image zoomed',
  props<{ x: number, y: number }>(),
)