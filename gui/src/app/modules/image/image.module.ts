import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { SceneComponent } from './components/scene.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule,
  ],
  declarations: [
    SceneComponent,
  ],
  exports: [
    SceneComponent,
  ],
})
export class ImageModule {}