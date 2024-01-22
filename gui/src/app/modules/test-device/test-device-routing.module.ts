import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDialogEntryComponent } from './components/test-dialog-entry.component';

const routes: Routes = [
  {
    path: '',
    component: TestDialogEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestDeviceRoutingModule {}