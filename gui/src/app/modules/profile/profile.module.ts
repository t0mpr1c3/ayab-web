import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationConfirmationComponent } from './components/registration-form/registration-confirmation/registration-confirmation.component';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { SettingsListComponent } from './components/settings-form/settings-list.component';
import { SettingTemplateDirective } from './components/settings-form/settings-template.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    RegistrationFormComponent,
    RegistrationConfirmationComponent,
    SettingsFormComponent,
    SettingsListComponent,
    SettingTemplateDirective,
  ],
  exports: [
    RegistrationFormComponent,
    SettingsFormComponent,
  ],
})
export class ProfileModule {}