import { createReducer, on } from '@ngrx/store';
import * as fromOptions from '../actions/options.actions';

import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';

export const featureKey = 'options';

export interface State {
  valid: boolean;
  mode: ModeEnum;
  colors: number;
  startRow: number;
  infRepeat: boolean;
  startNeedle: number;
  startColor: ColorEnum;
  stopNeedle: number;
  stopColor: ColorEnum;
  alignment: AlignmentEnum;
  knitSide: boolean;
}

export const initialState: State = {
  valid: true,
  mode: ModeEnum.Single_Bed,
  colors: 2,
  startRow: 1,
  infRepeat: false,
  startNeedle: 1,
  startColor: ColorEnum.orange,
  stopNeedle: 1,
  stopColor: ColorEnum.green,
  alignment: AlignmentEnum.Center,
  knitSide: false,
};

export const reducer = createReducer(
  initialState,

  on(fromOptions.setOptionsValidityAction, (state, { valid: valid }) => ({ 
    ...state, 
    valid: valid,
  })),

  on(fromOptions.setKnittingModeOptionAction, (state, { mode: mode }) => ({ 
    ...state, 
    mode: mode,
  })),

  on(fromOptions.setColorsOptionAction, (state, { colors: colors }) => ({ 
    ...state,
    colors: colors,
  })),

  on(fromOptions.setStartRowOptionAction, (state, { startRow: startRow }) => ({ 
    ...state,
    startRow: startRow,
  })),

  on(fromOptions.setInfiniteRepeatOptionAction, (state, { infRepeat: infRepeat }) => ({ 
    ...state,
    infRepeat: infRepeat,
  })),

  on(fromOptions.setStartNeedleOptionAction, (state, { startNeedle: startNeedle }) => ({ 
    ...state,
    startNeedle: startNeedle,
  })),

  on(fromOptions.setStartColorOptionAction, (state, { startColor: startColor }) => ({ 
    ...state,
    startColor: startColor,
  })),

  on(fromOptions.setStopNeedleOptionAction, (state, { stopNeedle: stopNeedle }) => ({ 
    ...state,
    stopNeedle: stopNeedle,
  })),

  on(fromOptions.setStopColorOptionAction, (state, { stopColor: stopColor }) => ({ 
    ...state,
    stopColor: stopColor,
  })),
  
  on(fromOptions.setAlignmentOptionAction, (state, { alignment: alignment }) => ({ 
    ...state,
    alignment: alignment,
  })),

  on(fromOptions.setKnitSideOptionAction, (state, { knitSide: knitSide }) => ({ 
    ...state,
    knitSide: knitSide,
  })),
);

export const selectOptionsValidity = (state: State) => state.valid;
export const selectKnittingModeOption = (state: State) => state.mode;
export const selectColorsOption = (state: State) => state.colors;
export const selectStartRowOption = (state: State) => state.startRow;
export const selectInfiniteRepeatOption = (state: State) => state.infRepeat;
export const selectStartNeedleOption = (state: State) => state.startNeedle;
export const selectStartColorOption = (state: State) => state.startColor;
export const selectStopNeedleOption = (state: State) => state.stopNeedle;
export const selectStopColorOption = (state: State) => state.stopColor;
export const selectAlignmentOption = (state: State) => state.alignment;
export const selectKnitSideOption = (state: State) => state.knitSide;
export const selectNewImageOptions = (state: State) => {
  state.startRow;
  state.startNeedle;
  state.startColor;
  state.stopNeedle;
  state.stopColor;
  state.alignment;
  state.knitSide;
};