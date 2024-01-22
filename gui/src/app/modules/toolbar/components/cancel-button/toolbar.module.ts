import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { AboutDialogComponent } from '../help-menu/about-dialog/about-dialog.component';
import { CancelKnittingButtonComponent } from './cancel-button.component';
import { HelpMenuComponent } from '../help-menu/help-menu.component';
import { ImageMenuComponent } from '../image-menu/image-menu.component';
import { ImageReflectFormComponent } from '../image-menu/image-reflect-form.component';
import { ImageRepeatFormComponent } from '../image-menu/image-repeat-form.component';
import { ImageStretchFormComponent } from '../image-menu/image-stretch-form.component';
import { KnitButtonComponent } from '../knit-button/knit-button.component';
import { LoadImageButtonComponent } from '../load-image-button/load-image-button.component';
import { MyAYABMenuComponent } from '../my-ayab-menu/my-ayab-menu.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ToolsMenuComponent } from '../tools-menu/tools-menu.component';

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
    AboutDialogComponent,
    CancelKnittingButtonComponent,
    HelpMenuComponent,
    ImageMenuComponent,
    ImageReflectFormComponent,
    ImageRepeatFormComponent,
    ImageStretchFormComponent,
    KnitButtonComponent,
    LoadImageButtonComponent,
    MyAYABMenuComponent,
    ToolbarComponent,
    ToolsMenuComponent,
  ],
  exports: [
    ToolbarComponent,
  ],
})
export class ToolbarModule {}