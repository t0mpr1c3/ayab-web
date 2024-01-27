import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromOptions from '../actions/options.actions';

import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { MachineEnum } from '../../../../../../shared/src/models/machine-enum.model';
import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';

/**
 * @title Options facade
 */
@Injectable()
export default class OptionsFacade {
  public enableOptions$ = this._store.select(fromRoot.selectConfiguring);
  public loggedIn$ = this._store.select(fromRoot.selectLoggedIn);
  public settings$ = this._store.select(fromRoot.selectSettings);
  public machine$ = this._store.select(fromRoot.selectMachineSetting);
  public width$ = this._store.select(fromRoot.selectMachineWidth);
  public rows$ = this._store.select(fromRoot.selectImageHeight);

  public mode$ = this._store.select(fromRoot.selectKnittingModeOption);
  public colors$ = this._store.select(fromRoot.selectColorsOption);
  public startRow$ = this._store.select(fromRoot.selectStartRowOption);
  public infRepeat$ = this._store.select(fromRoot.selectInfiniteRepeatOption);
  public startNeedle$ = this._store.select(fromRoot.selectStartNeedleOption);
  public startColor$ = this._store.select(fromRoot.selectStartColorOption);
  public stopNeedle$ = this._store.select(fromRoot.selectStopNeedleOption);
  public stopColor$ = this._store.select(fromRoot.selectStopColorOption);
  public alignment$ = this._store.select(fromRoot.selectAlignmentOption);
  public knitSide$ = this._store.select(fromRoot.selectKnitSideOption);
  
  
  constructor(private _store: Store<fromRoot.State>) {}

  public setKnittingModeOption(mode: ModeEnum): void {
    this._store.dispatch(fromOptions.setKnittingModeOptionAction({ mode: mode }));
  }

  public setColorsOption(colors: number): void {
    this._store.dispatch(fromOptions.setColorsOptionAction({ colors: colors }));
  }

  public setStartRowOption(startRow: number): void {
    this._store.dispatch(fromOptions.setStartRowOptionAction({ startRow: startRow }));
  }

  public setInfiniteRepeatOption(infRepeat: boolean): void {
    this._store.dispatch(fromOptions.setInfiniteRepeatOptionAction({ infRepeat: infRepeat }));
  }

  public setStartNeedleOption(startNeedle: number): void {
    this._store.dispatch(fromOptions.setStartNeedleOptionAction({ startNeedle: startNeedle }));
  }

  public setStartColorOption(startColor: ColorEnum): void {
    this._store.dispatch(fromOptions.setStartColorOptionAction({ startColor: startColor }));
  }

  public setStopNeedleOption(stopNeedle: number): void {
    this._store.dispatch(fromOptions.setStopNeedleOptionAction({ stopNeedle: stopNeedle }));
  }

  public setStopColorOption(stopColor: ColorEnum): void {
    this._store.dispatch(fromOptions.setStopColorOptionAction({ stopColor: stopColor }));
  }

  public setAlignmentOption(alignment: AlignmentEnum): void {
    this._store.dispatch(fromOptions.setAlignmentOptionAction({ alignment: alignment }));
  }

  public setKnitSideOption(knitSide: boolean): void {
    this._store.dispatch(fromOptions.setKnitSideOptionAction({ knitSide: knitSide }));
  }
}