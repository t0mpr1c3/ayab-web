import { createAction, props } from '@ngrx/store';

import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';

export const setKnittingModeOptionAction = createAction(
  '[Options] Set knitting mode',
  props<{ mode: ModeEnum }>(),
);
export const setColorsOptionAction = createAction(
  '[Options] Set colors',
  props<{ colors: number }>(),
);
export const setStartRowOptionAction = createAction(
  '[Options] Set start row',
  props<{ startRow: number }>(),
);
export const setInfiniteRepeatOptionAction = createAction(
  '[Options] Set infinite repeat',
  props<{ infRepeat: boolean }>(),
);
export const setStartNeedleOptionAction = createAction(
  '[Options] Set start needle index',
  props<{ startNeedle: number }>(),
);
export const setStartColorOptionAction = createAction(
  '[Options] Set start needle color',
  props<{ startColor: ColorEnum }>(),
);
export const setStopNeedleOptionAction = createAction(
  '[Options] Set stop needle index',
  props<{ stopNeedle: number }>(),
);
export const setStopColorOptionAction = createAction(
  '[Options] Set stop needle color',
  props<{ stopColor: ColorEnum }>(),
);
export const setAlignmentOptionAction = createAction(
  '[Options] Set alignment',
  props<{ alignment: AlignmentEnum }>(),
);
export const setKnitSideOptionAction = createAction(
  '[Options] Set knit side',
  props<{ knitSide: boolean }>(),
);