import { CommonModule } from '@angular/common';
import MaterialModule from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SettingsRoutingModule from './settings-routing.module';
import SharedModule from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import SettingsDialogEntryComponent from './components/settings-dialog-entry.component';
import SettingsFormComponent from './components/settings-form/settings-form.component';
import SettingsListComponent from './components/settings-list.component';
import SettingTemplateDirective from './components/settings-template.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    SettingsDialogEntryComponent,
    SettingsFormComponent,    
    SettingsListComponent,
    SettingTemplateDirective,
  ],
  exports: [SettingsDialogEntryComponent],
})
export default class SettingsModule {}