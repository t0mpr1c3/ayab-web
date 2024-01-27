import AuthRoutingModule from './auth-routing.module';
import { CommonModule } from '@angular/common';
import MaterialModule from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SharedModule from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import LoginDialogEntryComponent from './components/login-dialog-entry.component';
import LoginFormComponent from './components/login-form/login-form.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    LoginFormComponent,
    LoginDialogEntryComponent,
  ],
  exports: [LoginFormComponent],
})
export default class AuthModule {}