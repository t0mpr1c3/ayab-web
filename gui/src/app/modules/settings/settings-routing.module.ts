import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import SettingsDialogEntryComponent from './components/settings-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsDialogEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class SettingsRoutingModule {}