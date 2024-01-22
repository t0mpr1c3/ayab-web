import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DebounceClickDirective } from './directives/debounce.directive';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { GenericCheckboxComponent } from './components/generic-checkbox/generic-checkbox.component';
import { GenericSelectComponent } from './components/generic-select/generic-select.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';

const COMPONENTS = [
  CustomSnackbarComponent,
  DebounceClickDirective,
  FormDialogComponent,
  GenericButtonComponent,
  GenericCheckboxComponent,
  GenericSelectComponent,
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule {}