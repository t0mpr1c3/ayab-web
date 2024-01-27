import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import FirmwareDialogEntryComponent from './components/firmware-upload-entry.component';

const routes: Routes = [
  {
    path: '',
    component: FirmwareDialogEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class FirmwareUploadRoutingModule {}