import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ToolbarModule } from '../toolbar/components/cancel-button/toolbar.module';

import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule,
    ToolbarModule,
  ],
  declarations: [
    LayoutComponent,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class CoreModule {}