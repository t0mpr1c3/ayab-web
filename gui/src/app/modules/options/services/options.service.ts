import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromOptions from '../actions/options.actions';

//import OptionsFacade from '../facade/options.facade';
import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';

@Injectable({ providedIn: 'root' })
export default class OptionsService {
  constructor(private _store: Store<fromRoot.State>) {}

  public formControls = {
    mode: new FormControl<ModeEnum>(ModeEnum.Single_Bed, { nonNullable: true }),
    colors: new FormControl<number>(2, { nonNullable: true }),
    startRow: new FormControl<number>(1, { nonNullable: true }),
    infRepeat: new FormControl<boolean>(false, { nonNullable: true }),
    startNeedle: new FormControl<number>(20, { nonNullable: true }),
    startColor: new FormControl<ColorEnum>(0, { nonNullable: true }),
    stopNeedle: new FormControl<number>(20, { nonNullable: true }),
    stopColor: new FormControl<ColorEnum>(1, { nonNullable: true }),
    alignment: new FormControl<AlignmentEnum>(AlignmentEnum.Center, { nonNullable: true }),
    knitSide: new FormControl<boolean>(false, { nonNullable: true }),
  };

  // Refresh options form to defaults
  public refresh(settings: any) {
    // Refresh form controls
    this.formControls.mode!.setValue( settings.mode );
    this.formControls.infRepeat!.setValue( settings.infRepeat );
    this.formControls.alignment!.setValue( settings.alignment );
    this.formControls.knitSide!.setValue( settings.knitSide );
    // Update state
    this._store.dispatch( fromOptions.setKnittingModeOptionAction({ mode: settings.mode }));
    this._store.dispatch( fromOptions.setInfiniteRepeatOptionAction({ infRepeat: settings.infRepeat }));
    this._store.dispatch( fromOptions.setAlignmentOptionAction({ alignment: settings.alignment }));
    this._store.dispatch( fromOptions.setKnitSideOptionAction({ knitSide: settings.knitSide }));
  }
}