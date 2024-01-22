import { CommonModule } from '@angular/common';
import { FirmwareUploadRoutingModule } from './firmware-upload-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { FirmwareDialogComponent } from './components/firmware-upload-dialog/firmware-upload-dialog.component';
import { FirmwareDialogEntryComponent } from './components/firmware-upload-entry.component';

@NgModule({
  imports: [
    CommonModule,
    FirmwareUploadRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    FirmwareDialogComponent,
    FirmwareDialogEntryComponent,
  ],
  exports: [
    FirmwareDialogComponent,
  ],
})
export class FirmwareUploadModule {}