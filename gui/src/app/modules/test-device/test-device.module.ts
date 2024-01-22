import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TestDeviceRoutingModule } from './test-device-routing.module';

import { TestDialogComponent } from './components/test-dialog/test-dialog.component';
import { TestDialogEntryComponent } from './components/test-dialog-entry.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule,
    TestDeviceRoutingModule,
  ],
  declarations: [
    TestDialogComponent,
    TestDialogEntryComponent,
  ],
  exports: [
    TestDialogComponent,
  ],
})
export class TestDeviceModule {}