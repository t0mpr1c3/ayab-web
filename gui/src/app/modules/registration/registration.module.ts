import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationConfirmationComponent } from './components/registration-confirmation/registration-confirmation.component';
import { RegistrationDialogEntryComponent } from './components/registration-dialog-entry.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    RegistrationConfirmationComponent,
    RegistrationDialogEntryComponent,
    RegistrationFormComponent,
  ],
  exports: [RegistrationDialogEntryComponent],
})
export class RegistrationModule {}