import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AlignmentEnum } from '../../../../../../shared/src/models/alignment-enum.model';
import { ColorEnum } from '../../../../../../shared/src/models/color-enum.model';
import { ModeEnum } from '../../../../../../shared/src/models/mode-enum.model';

@Injectable({ providedIn: 'root' })
export default class OptionsService {
  public formControls = {
    mode: new FormControl<ModeEnum>(ModeEnum.Single_Bed, { nonNullable: true }),
    colors: new FormControl<number>(2, { nonNullable: true }),
    row: new FormControl<number>(1, { nonNullable: true }),
    infRepeat: new FormControl<boolean>(false, { nonNullable: true }),
    startNeedle: new FormControl<number>(1, { nonNullable: true }),
    startColor: new FormControl<ColorEnum>(0, { nonNullable: true }),
    stopNeedle: new FormControl<number>(1, { nonNullable: true }),
    stopColor: new FormControl<ColorEnum>(1, { nonNullable: true }),
    alignment: new FormControl<AlignmentEnum>(AlignmentEnum.Center, { nonNullable: true }),
    mirror: new FormControl<boolean>(false, { nonNullable: true }),
  };

  public reset(settings: any) {
    // Reset form controls
    this.formControls.mode!.setValue(settings.mode);
    this.formControls.infRepeat!.setValue(settings.infRepeat);
    this.formControls.alignment!.setValue(settings.alignment);
    this.formControls.mirror!.setValue(settings.knitSide);
  }
}