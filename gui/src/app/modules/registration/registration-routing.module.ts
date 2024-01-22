import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationDialogEntryComponent } from './components/registration-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationDialogEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}