import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { FirmwareUploadModule } from '../firmware-upload/firmware-upload.module';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { OptionsModule } from '../options/options.module';
import { ProfileModule } from '../profile/profile.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TestDeviceModule } from '../test-device/test-device.module';

import { AboutDialogComponent } from './components/help-menu/about-dialog/about-dialog.component';
import { CancelKnittingButtonComponent } from './components/cancel-button/cancel-button.component';
import { HelpMenuComponent } from './components/help-menu/help-menu.component';
import { ImageMenuComponent } from './components/image-menu/image-menu.component';
import { ImageReflectFormComponent } from './components/image-menu/image-reflect-form.component';
import { ImageRepeatFormComponent } from './components/image-menu/image-repeat-form.component';
import { ImageStretchFormComponent } from './components/image-menu/image-stretch-form.component';
import { KnitButtonComponent } from './components/knit-button/knit-button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadImageButtonComponent } from './components/load-image-button/load-image-button.component';
import { MyAYABMenuComponent } from './components/my-ayab-menu/my-ayab-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolsMenuComponent } from './components/tools-menu/tools-menu.component';
import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
    AuthModule, // FIXME should be lazy loaded
    CommonModule,
    FirmwareUploadModule, // FIXME should be lazy loaded
    // KnitModule, // FIXME should be lazy loaded
    MaterialModule,
    OptionsModule, // FIXME should be lazy loaded
    ProfileModule, // FIXME should be lazy loaded
    ReactiveFormsModule,
    SharedModule,
    StoreModule,
    TestDeviceModule, // FIXME should be lazy loaded
  ],
  declarations: [
    AboutDialogComponent,
    AppComponent,
    CancelKnittingButtonComponent,
    HelpMenuComponent,
    ImageMenuComponent,
    ImageReflectFormComponent,
    ImageRepeatFormComponent,
    ImageStretchFormComponent,
    KnitButtonComponent,
    LayoutComponent,
    LoadImageButtonComponent,
    MyAYABMenuComponent,
    ToolbarComponent,
    ToolsMenuComponent,
  ],
  exports: [
    AppComponent,
    //LayoutComponent
  ],
})
export class CoreModule {}