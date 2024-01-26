import { createReducer, on } from '@ngrx/store';
import * as fromOptions from '../actions/options.actions';

import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';

export const featureKey = 'options';

export interface State {
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

  on(fromOptions.setKnittingModeOptionAction, (state, { mode }) => ({ 
    ...state, 
    mode: mode,
  })),

  on(fromOptions.setColorsOptionAction, (state, { colors }) => ({ 
    ...state,
    colors: colors,
  })),

  on(fromOptions.setStartRowOptionAction, (state, { startRow }) => ({ 
    ...state,
    startRow: startRow,
  })),

  on(fromOptions.setInfiniteRepeatOptionAction, (state, { infRepeat }) => ({ 
    ...state,
    infRepeat: infRepeat,
  })),

  on(fromOptions.setStartNeedleOptionAction, (state, { startNeedle }) => ({ 
    ...state,
    startNeedle: startNeedle,
  })),

  on(fromOptions.setStartColorOptionAction, (state, { startColor }) => ({ 
    ...state,
    startColor: startColor,
  })),

  on(fromOptions.setStopNeedleOptionAction, (state, { stopNeedle }) => ({ 
    ...state,
    stopNeedle: stopNeedle,
  })),

  on(fromOptions.setStopColorOptionAction, (state, { stopColor }) => ({ 
    ...state,
    stopColor: stopColor,
  })),
  
  on(fromOptions.setAlignmentOptionAction, (state, { alignment }) => ({ 
    ...state,
    alignment: alignment,
  })),

  on(fromOptions.setKnitSideOptionAction, (state, { knitSide }) => ({ 
    ...state,
    knitSide: knitSide,
  })),
);

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