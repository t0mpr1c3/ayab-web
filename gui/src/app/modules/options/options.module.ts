import { CommonModule } from '@angular/common';
import MaterialModule from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SharedModule from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import ColorsInputComponent from './components/colors-input/colors-input.component';
import MirrorCheckboxComponent from './components/mirror-checkbox/mirror-checkbox.component';
import MirrorIconComponent from './components/mirror-checkbox/mirror-icon.component';
import MirrorIconDirective from './components/mirror-checkbox/mirror-icon.directive';
import NeedleInputComponent from './components/needle-input/needle-input.component';
import OptionsPanelComponent from './components/options-panel/options-panel.component';
import PortSelectComponent from './components/port-select/port-select.component';
import RowInputComponent from './components/row-input/row-input.component';
import ModeInputComponent from './components/mode-input/mode-input.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    ColorsInputComponent,
    MirrorCheckboxComponent,
    MirrorIconComponent,
    MirrorIconDirective,
    ModeInputComponent,
    NeedleInputComponent,
    OptionsPanelComponent,
    PortSelectComponent,
    RowInputComponent,
  ],
  exports: [OptionsPanelComponent],
})
export default class OptionsModule {
  static getOptionsPanelComponent() {
    return OptionsPanelComponent;
  }
}