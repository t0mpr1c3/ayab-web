import { CommonModule } from '@angular/common';
import MaterialModule from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import SharedModule from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import AboutDialogComponent from './components/help-menu/about-dialog/about-dialog.component';
import CancelKnittingButtonComponent from './components/cancel-button/cancel-button.component';
import HelpMenuComponent from './components/help-menu/help-menu.component';
import ImageMenuComponent from '../image/components/image-menu/image-menu.component';
import ImageReflectFormComponent from '../image/components/image-menu/image-reflect-form.component';
import ImageRepeatFormComponent from '../image/components/image-menu/image-repeat-form.component';
import ImageStretchFormComponent from '../image/components/image-menu/image-stretch-form.component';
import KnitButtonComponent from './components/knit-button/knit-button.component';
import LoadImageButtonComponent from './components/load-image-button/load-image-button.component';
import MyAYABMenuComponent from './components/my-ayab-menu/my-ayab-menu.component';
import ToolbarComponent from './components/toolbar/toolbar.component';
import ToolsMenuComponent from './components/tools-menu/tools-menu.component';

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
export default class ToolbarModule {}