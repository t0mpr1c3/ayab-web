import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginDialogEntryComponent } from './components/login-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    component: LoginDialogEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}