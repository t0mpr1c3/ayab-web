import { CommonModule } from '@angular/common';
import MaterialModule from '../material/material.module';
import { NgModule } from '@angular/core';
import SharedModule from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
  ],
  exports: [
  ],
})
export default class KnitModule {}