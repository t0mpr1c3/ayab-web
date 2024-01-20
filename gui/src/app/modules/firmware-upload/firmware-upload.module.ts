import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { FirmwareDialogComponent } from './components/firmware-upload-dialog/firmware-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    FirmwareDialogComponent,
  ],
  exports: [
    FirmwareDialogComponent,
  ],
})
export class FirmwareUploadModule {}