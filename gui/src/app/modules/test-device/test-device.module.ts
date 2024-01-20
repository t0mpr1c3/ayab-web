import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TestDialogComponent } from './components/test-dialog/test-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    TestDialogComponent,
  ],
  exports: [
    TestDialogComponent,
  ],
})
export class TestDeviceModule {}